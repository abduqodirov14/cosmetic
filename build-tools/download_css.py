import os
import urllib.request
import re

css_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\css'
os.makedirs(css_dir, exist_ok=True)

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

urls = []
for link in soup.find_all('link', rel='stylesheet'):
    href = link.get('href')
    if href:
        if href.startswith('//'):
            href = 'https:' + href
        elif href.startswith('/'):
            href = 'https://www.hocllabs.com' + href
        urls.append(href)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for url in urls:
    # clean filename
    basename = url.split('/')[-1].split('?')[0]
    if not basename.endswith('.css'):
        basename += '.css'
    filepath = os.path.join(css_dir, basename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            with open(filepath, 'wb') as out_f:
                out_f.write(content)
        print(f"Downloaded {basename}: {len(content)} bytes")
    except Exception as e:
        print(f"Failed {url}: {e}")
