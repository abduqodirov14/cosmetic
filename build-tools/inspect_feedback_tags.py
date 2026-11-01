import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
fb = soup.find(id='shopify-section-template--27508218462251__hs_floating_feedback_5_bNnN4B')
if fb:
    # Print non-style tags
    for child in fb.find_all(True):
        if child.name not in ['style', 'script'] and child.get('class'):
            print(f"<{child.name} class='{' '.join(child.get('class'))}'> {child.get_text().strip()[:40]}")
