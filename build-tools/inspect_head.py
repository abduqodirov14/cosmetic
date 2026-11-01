import re
from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("Head children:")
for child in soup.head.children:
    if child.name in ['title', 'meta', 'link', 'style']:
        if child.name == 'link' and child.get('rel') == ['stylesheet']:
            print(" LINK CSS:", child.get('href'))
        elif child.name == 'style':
            print(" STYLE tag len:", len(child.string or ''))
