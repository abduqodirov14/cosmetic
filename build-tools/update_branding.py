import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace title
content = re.sub(
    r'<title>\s*hocllabs\.com\s*–\s*HOCL LABS\s*</title>',
    '<title>YOUR TITLE — Terini Qayta Tiklovchi Rasmiy Do\'kon</title>',
    content,
    flags=re.IGNORECASE
)

# 2. Replace meta tags
content = content.replace(
    'content="HOCL LABS " property="og:site_name"',
    'content="YOUR TITLE" property="og:site_name"'
)
content = content.replace(
    'content="hocllabs.com" property="og:title"',
    'content="YOUR TITLE" property="og:title"'
)
content = content.replace(
    'content="hocllabs.com" name="twitter:title"',
    'content="YOUR TITLE" name="twitter:title"'
)
content = content.replace(
    'content="HOCL LABS " property="og:description"',
    'content="YOUR TITLE — Terini chuqur tiklovchi va himoya qiluvchi zamonaviy kosmetika vositalari." property="og:description"'
)
content = content.replace(
    'content="HOCL LABS " name="twitter:description"',
    'content="YOUR TITLE — Terini chuqur tiklovchi va himoya qiluvchi zamonaviy kosmetika vositalari." name="twitter:description"'
)

# 3. Replace splash screen logo
old_splash_logo = '''<div class="hs_splash-logo">
                  <img src="https://cdn.shopify.com/s/files/1/0605/5791/8251/files/wsw.png?v=1775750014" alt="Logo" />
                </div>'''

new_splash_logo = '''<div class="hs_splash-logo">
                  <span class="brand-logo-text" style="color: #ffffff; font-size: 30px; letter-spacing: 0.2em;">YOUR TITLE</span>
                </div>'''

content = content.replace(old_splash_logo, new_splash_logo)

# 4. Replace Header logo
old_header_logo = '''<div class="hs_header-logo">
<a href="/">
<img src="./assets/images/wsw.png"/>
</a>
</div>'''

new_header_logo = '''<div class="hs_header-logo">
<a class="brand-logo-link" href="/">
<span class="brand-logo-text">YOUR TITLE</span>
</a>
</div>'''

content = content.replace(old_header_logo, new_header_logo)

# 5. Replace Footer logo
old_footer_logo = '''<div class="hs_footer-logo">
<a href="/">
<img src="./assets/images/wsw.png"/>
</a>
</div>'''

new_footer_logo = '''<div class="hs_footer-logo">
<a class="brand-logo-link" href="/">
<span class="brand-logo-text brand-logo-text--footer">YOUR TITLE</span>
</a>
</div>'''

content = content.replace(old_footer_logo, new_footer_logo)

# 6. Replace Ritual Cloud Eyebrow
content = content.replace(
    '<span class="rc-eyebrow">HOCL LABS · Rituallar</span>',
    '<span class="rc-eyebrow">YOUR TITLE · Rituallar</span>'
)

# 7. Replace footer copyright handle
content = content.replace(
    '<p>@hocllabs</p>',
    '<p>@yourtitle</p>'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html branding successfully!")
