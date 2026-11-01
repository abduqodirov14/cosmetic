from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
header = soup.find(id='shopify-section-sections--27508218691627__hs_header_gzHzB3')
for el in header.find_all(True):
    txt = el.get_text().strip()
    if 'Search' in txt and el.name in ['div', 'summary', 'button', 'a', 'span']:
        print(f"<{el.name} class='{el.get('class')}'>: {txt[:40]}")
