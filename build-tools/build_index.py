import re
import os
import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

raw_path = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\build-tools\raw_homepage.html'
output_path = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html'

with open(raw_path, 'r', encoding='utf-8') as f:
    raw_html = f.read()

soup = BeautifulSoup(raw_html, 'html.parser')

img_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\images'
fonts_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\fonts'
local_images = set(os.listdir(img_dir))
local_fonts = set(os.listdir(fonts_dir))

def map_url(u):
    if not u:
        return u
    base = u.split('/')[-1].split('?')[0]
    if base in local_images:
        return f"./assets/images/{base}"
    if base in local_fonts:
        return f"./assets/fonts/{base}"
    return u

# Clean and map all <img> tags
for img in soup.find_all('img'):
    src = img.get('src')
    if src:
        img['src'] = map_url(src)
    srcset = img.get('srcset')
    if srcset:
        parts = []
        for p in srcset.split(','):
            p = p.strip()
            if not p:
                continue
            toks = p.split(' ')
            mapped = map_url(toks[0])
            size = toks[1] if len(toks) > 1 else ''
            parts.append(f"{mapped} {size}".strip())
        img['srcset'] = ', '.join(parts)

# Map all style background images and font urls
for st in soup.find_all('style'):
    if st.string:
        def repl_url(m):
            raw = m.group(1).strip('\'"')
            return f"url('{map_url(raw)}')"
        st.string = re.sub(r'url\(([^)]+)\)', repl_url, st.string)

# Configure video
for v in soup.find_all('video'):
    v['src'] = './assets/videos/hero_scroll.mp4'
    v['data-desktop'] = './assets/videos/hero_scroll.mp4'
    v['data-mobile'] = './assets/videos/hero_scroll.mp4'

# Remove Shopify tracking scripts from head and body
for scr in soup.find_all('script'):
    src = scr.get('src', '')
    txt = scr.string or ''
    if any(k in src for k in ['trekkie', 'google-analytics', 'doubleclick', 'okendo', 'rivo', 'uppromote', 'secomapp', 'perf-kit', 'origin_trials', 'standard-events', 'load_feature', 'preloads.js']):
        scr.decompose()
    elif any(k in txt for k in ['ShopifyAnalytics', 'oaiq', 'trekkie', 'Shopify.SignInWithShop', 'window.BOOMR', 'window.ShopifyPaypalV4VisibilityTracking']):
        scr.decompose()

# Adjust CSS link tags in head
head = soup.head
# Remove existing remote theme CSS links and replace with our local bundle
for link in head.find_all('link', rel='stylesheet'):
    href = link.get('href', '')
    if 'fonts.googleapis.com' in href:
        continue # keep Google fonts
    link.decompose()

# Add our local stylesheet links
css_bundle = [
    './assets/css/fonts.css',
    './assets/css/base.css',
    './assets/css/styles.css',
    './assets/css/hs-custom.css',
    './assets/css/hs-products.css',
    './assets/css/component-cart-items.css',
    './assets/css/component-cart-drawer.css',
    './assets/css/component-cart.css',
    './assets/css/component-totals.css',
    './assets/css/component-price.css',
    './assets/css/component-discounts.css',
    './assets/css/component-predictive-search.css',
    './assets/css/component-card.css',
    './assets/css/swiper-bundle.min.css',
    './assets/css/splide.min.css',
    './assets/css/app.css'
]

for css_file in css_bundle:
    new_link = soup.new_tag('link', rel='stylesheet', href=css_file)
    head.append(new_link)

# Add Before & After interactive slider markup into the CPR section if not present
cpr_section = soup.find(id='shopify-section-template--27508218462251__cpr_hero_scroll_7_9BNbMM')
if cpr_section:
    ba_markup = BeautifulSoup('''
    <div class="ba-slider-container" id="cprBaSlider" role="region" aria-label="Before and after skin results comparison" style="--split: 50%;">
      <img src="./assets/images/SOS_Spray_-_BA_-_6A.webp" alt="Skin Before CPR Face Mist - redness and active acne" class="ba-before-img" draggable="false" />
      <img src="./assets/images/SOS_Spray_-_BA_-_6B.webp" alt="Skin After CPR Face Mist - calm, clear, restored skin" class="ba-after-img" draggable="false" />
      <div class="ba-divider-line" aria-hidden="true"></div>
      <button type="button" class="ba-handle" role="slider" aria-label="Comparison slider handle" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" tabindex="0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 7l-5 5 5 5"></path>
          <path d="M16 7l5 5-5 5"></path>
        </svg>
      </button>
      <span class="ba-label-after">AFTER</span>
      <span class="ba-label-before">BEFORE</span>
    </div>
    ''', 'html.parser')
    # Append to canvas
    canvas = cpr_section.find(class_='cpr-hs__canvas')
    if canvas:
        canvas.append(ba_markup)

# In the header icons, add the currency switcher
header_icons = soup.find(class_='hs_header-icons')
if header_icons:
    cur_div = soup.new_tag('div', **{'class': 'hs_header-icon hs_header-currency'})
    cur_sel = soup.new_tag('select', **{'data-currency-select': 'true', 'class': 'currency-dropdown', 'aria-label': 'Select Currency'})
    for code, label in [('AED', 'AED (Dhs)'), ('USD', 'USD ($)'), ('EUR', 'EUR (€)'), ('GBP', 'GBP (£)')]:
        opt = soup.new_tag('option', value=code)
        opt.string = label
        cur_sel.append(opt)
    cur_div.append(cur_sel)
    header_icons.insert(0, cur_div)

# In the Featured Collection section, let's enhance the CPR Face Mist card with clickable variant size pills
fc_section = soup.find(id='shopify-section-template--27508218462251__hs_featured_collection_GNmkLh')
if fc_section:
    cpr_card = None
    for p in fc_section.find_all(class_='hs_pro'):
        if 'CPR Face Mist' in p.get_text():
            cpr_card = p
            break
    if cpr_card:
        # Add variant pills above action buttons
        pills_html = BeautifulSoup('''
        <div class="variant-pills-row">
          <button type="button" class="variant-pill is-active" data-size="120ml">120ml</button>
          <button type="button" class="variant-pill" data-size="60ml">60ml</button>
          <button type="button" class="variant-pill" data-size="30ml">30ml</button>
        </div>
        ''', 'html.parser')
        info = cpr_card.find(class_='pe_pro-info') or cpr_card
        info.insert(1, pills_html)

# Add our custom script links at the bottom of the body
body = soup.body

# Ensure the core animation scripts are linked
script_files = [
    './assets/js/script_61.js',
    './assets/js/script_62.js',
    './assets/js/script_63.js',
    './assets/js/script_65.js',
    './assets/js/script_67.js',
    './assets/js/app.js'
]

for sf in script_files:
    tag = soup.new_tag('script', src=sf)
    body.append(tag)

# Save output
html_output = str(soup)
with open(output_path, 'w', encoding='utf-8') as out_f:
    out_f.write(html_output)

print(f"Successfully generated clone at {output_path}! Size: {len(html_output)} characters.")
