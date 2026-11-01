import re
import os

css_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\css'
img_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\images'
fonts_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\fonts'

local_images = set(os.listdir(img_dir))
local_fonts = set(os.listdir(fonts_dir))

def clean_css_urls(css_text, is_in_css_file=False):
    prefix_img = '../images/' if is_in_css_file else './assets/images/'
    prefix_font = '../fonts/' if is_in_css_file else './assets/fonts/'
    
    def repl(m):
        full_match = m.group(0)
        u = m.group(1).strip('\'"')
        base = u.split('/')[-1].split('?')[0]
        if base in local_images:
            return f"url('{prefix_img}{base}')"
        if base in local_fonts:
            return f"url('{prefix_font}{base}')"
        return full_match

    return re.sub(r'url\(([^)]+)\)', repl, css_text)

# Test on styles.css
with open(os.path.join(css_dir, 'styles.css'), 'r', encoding='utf-8') as f:
    text = f.read()

cleaned = clean_css_urls(text, is_in_css_file=True)
print("styles.css cleaned, len:", len(cleaned))
