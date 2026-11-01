from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

header_group = soup.find(id='shopify-section-sections--27508218691627__hs_header_gzHzB3')
if header_group:
    print("Found header group, len:", len(str(header_group)))

cart_drawer = soup.find(id='CartDrawer') or soup.find(class_=lambda c: c and 'cart-drawer' in c)
if cart_drawer:
    print("Found cart drawer, id/class:", cart_drawer.get('id'), cart_drawer.get('class'))

footer = soup.find(id='shopify-section-sections--27508218658859__hs_footer_VxjwCx')
if footer:
    print("Found footer, len:", len(str(footer)))
