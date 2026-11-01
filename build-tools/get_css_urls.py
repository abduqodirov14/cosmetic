import urllib.request
import re
from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

css_urls = []
for link in soup.find_all('link', rel='stylesheet'):
    href = link.get('href')
    if href:
        if href.startswith('//'):
            href = 'https:' + href
        elif href.startswith('/'):
            href = 'https://www.hocllabs.com' + href
        css_urls.append(href)

print("Found", len(css_urls), "CSS URLs:")
for u in css_urls:
    print(" -", u)
