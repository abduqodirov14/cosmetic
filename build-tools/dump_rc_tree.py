import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

rc = soup.find(class_=lambda c: c and 'section-ritual-cloud' in c)
if rc:
    # Print the direct children tags and classes
    for child in rc.descendants:
        if child.name and child.name not in ['style', 'script']:
            print(f"<{child.name} class='{child.get('class', [])}' id='{child.get('id', '')}'>")
