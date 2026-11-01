import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

rc = soup.find(class_=lambda c: c and 'section-ritual-cloud' in c)
if rc:
    # find all ritual details
    for block in rc.find_all(class_=lambda c: c and ('rc-item' in c or 'ritual' in c or 'card' in c)):
        print(f"CLASS: {block.get('class')} | ID: {block.get('id')}")
        print("  ", ' '.join(block.get_text().split())[:120])
