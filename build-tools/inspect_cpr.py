from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
cpr = soup.find(id='shopify-section-template--27508218462251__cpr_hero_scroll_7_9BNbMM')
if cpr:
    # print non-style inner HTML
    for tag in cpr.find_all(['div', 'img', 'p', 'h1', 'h2', 'span', 'a']):
        if tag.get('class'):
            print(f"<{tag.name} class='{' '.join(tag.get('class'))}'> {tag.get_text().strip()[:60]}")
