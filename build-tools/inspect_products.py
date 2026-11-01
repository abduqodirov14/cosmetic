import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
fc = soup.find(id='shopify-section-template--27508218462251__hs_featured_collection_GNmkLh')
if fc:
    for pro in fc.find_all(class_=lambda c: c and 'hs_pro' in c):
        title = pro.find(class_=lambda c: c and 'title' in c) or pro.find(['h3', 'h4', 'h5'])
        price = pro.find(class_=lambda c: c and 'price' in c)
        imgs = [img.get('src') for img in pro.find_all('img')]
        buttons = [b.get_text().strip() for b in pro.find_all(['button', 'a'])]
        print("PRODUCT:")
        print("  Title:", title.get_text().strip() if title else 'No title')
        print("  Price:", price.get_text().strip() if price else 'No price')
        print("  Imgs:", imgs)
        print("  Actions:", [b for b in buttons if b])
