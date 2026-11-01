import os
import urllib.request
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs

img_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\images'
os.makedirs(img_dir, exist_ok=True)

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

all_img_urls = set()

# From img tags
for img in soup.find_all('img'):
    src = img.get('src')
    if src:
        all_img_urls.add(src)
    srcset = img.get('srcset')
    if srcset:
        for part in srcset.split(','):
            u = part.strip().split(' ')[0]
            if u:
                all_img_urls.add(u)

# From css background-image in inline styles
bg_urls = re.findall(r'url\(([^)]+)\)', html)
for u in bg_urls:
    u = u.strip('"\' ')
    if not u.startswith('data:'):
        all_img_urls.add(u)

print(f"Total candidate image URLs found: {len(all_img_urls)}")

# Download the key images
downloaded = 0
for raw_url in all_img_urls:
    url = raw_url
    if url.startswith('//'):
        url = 'https:' + url
    elif url.startswith('/'):
        url = 'https://www.hocllabs.com' + url
    
    if not url.startswith('http'):
        continue

    parsed = urlparse(url)
    clean_path = parsed.path
    ext = os.path.splitext(clean_path)[1]
    if not ext or len(ext) > 5:
        ext = '.jpg'
    
    # generate a clean filename
    name = os.path.basename(clean_path)
    if not name or len(name) > 60:
        name = f"img_{hash(url) & 0xffffffff}{ext}"
    
    dest_path = os.path.join(img_dir, name)
    if os.path.exists(dest_path):
        continue
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(dest_path, 'wb') as out_f:
                out_f.write(data)
            downloaded += 1
            print(f"[{downloaded}] Saved {name} ({len(data)} bytes)")
    except Exception as e:
        print(f"Skipped {url[:60]}: {e}")

print(f"Downloaded total {downloaded} images.")
