import re
import os
from bs4 import BeautifulSoup

raw_path = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html'
output_path = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html'

with open(raw_path, 'r', encoding='utf-8') as f:
    raw_html = f.read()

soup = BeautifulSoup(raw_html, 'html.parser')

# 1. Clean head
# Remove tracking scripts and remote font preloads that are now local
for s in soup.find_all('script'):
    src = s.get('src', '')
    content = s.string or ''
    # remove external analytics, shopify cloud tracking, trackers
    if any(k in src for k in ['trekkie', 'google-analytics', 'doubleclick', 'okendo', 'rivo', 'uppromote', 'secomapp', 'perf-kit', 'origin_trials']):
        s.decompose()
    elif any(k in content for k in ['ShopifyAnalytics', 'oaiq', 'trekkie', 'rivo', 'uppromote']):
        s.decompose()

# Map remote cdn image URLs to local assets
img_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\images'
local_images = set(os.listdir(img_dir))

def replace_img_url(url):
    if not url:
        return url
    basename = url.split('/')[-1].split('?')[0]
    if basename in local_images:
        return f"./assets/images/{basename}"
    return url

# Replace in img src and srcset
for img in soup.find_all('img'):
    src = img.get('src')
    if src:
        img['src'] = replace_img_url(src)
    srcset = img.get('srcset')
    if srcset:
        new_parts = []
        for part in srcset.split(','):
            part = part.strip()
            if not part:
                continue
            tokens = part.split(' ')
            u = replace_img_url(tokens[0])
            w = tokens[1] if len(tokens) > 1 else ''
            new_parts.append(f"{u} {w}".strip())
        img['srcset'] = ', '.join(new_parts)

# Replace video src
for video in soup.find_all('video'):
    video['src'] = './assets/videos/hero_scroll.mp4'
    video['data-desktop'] = './assets/videos/hero_scroll.mp4'
    video['data-mobile'] = './assets/videos/hero_scroll.mp4'

print("Processed soup!")
