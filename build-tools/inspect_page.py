import re
from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print('=== TITLE ===')
print(soup.title.string.strip() if soup.title and soup.title.string else 'No title')

print('\n=== META DESCRIPTION ===')
meta_desc = soup.find('meta', attrs={'name': 'description'})
print(meta_desc['content'] if meta_desc and 'content' in meta_desc.attrs else 'No meta description')

print('\n=== NAVIGATION ITEMS ===')
for nav in soup.find_all('nav'):
    print('NAV:', nav.get('class'))
    for a in nav.find_all('a'):
        text = a.get_text(strip=True)
        href = a.get('href', '')
        if text:
            print(f'  - {text} -> {href}')

print('\n=== HEADINGS (h1, h2, h3) ===')
for h in soup.find_all(['h1', 'h2', 'h3']):
    text = ' '.join(h.get_text().split())
    if text:
        print(f'{h.name}: {text}')

print('\n=== SECTIONS & IDS ===')
for sec in soup.find_all(['section', 'header', 'footer']):
    s_id = sec.get('id', '')
    s_classes = ' '.join(sec.get('class', []))
    print(f'<{sec.name}> id="{s_id}" class="{s_classes[:60]}"')
