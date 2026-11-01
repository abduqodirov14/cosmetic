import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
main = soup.find('main', id='MainContent')

for idx, child in enumerate(main.find_all(recursive=False)):
    c_id = child.get('id', '')
    c_class = ' '.join(child.get('class', []))
    text = ' '.join(child.get_text().split())
    has_style = bool(child.find('style'))
    has_script = bool(child.find('script'))
    has_img = len(child.find_all('img'))
    print(f"[{idx}] {child.name} id='{c_id}' class='{c_class}'")
    print(f"     imgs: {has_img}, has_style: {has_style}, has_script: {has_script}, text_len: {len(text)}")
    if text:
        print(f"     text snippet: {text[:100]}")
