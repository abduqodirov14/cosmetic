import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
fb = soup.find(id='shopify-section-template--27508218462251__hs_floating_feedback_5_bNnN4B')
if fb:
    print("Found floating feedback section, length:", len(str(fb)))
    for card in fb.find_all(class_=lambda c: c and ('card' in c or 'feedback' in c or 'review' in c or 'item' in c or 'slide' in c)):
        print("CARD CLASS:", card.get('class'))
        print("TEXT:", ' '.join(card.get_text().split())[:120])
        print("---")
