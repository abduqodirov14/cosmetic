from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
header = soup.find(id='shopify-section-sections--27508218691627__hs_header_gzHzB3')
if header:
    for a in header.find_all(['a', 'button']):
        href = a.get('href', '')
        cls = ' '.join(a.get('class', []))
        a_id = a.get('id', '')
        if 'cart' in href or 'cart' in cls or 'cart' in a_id:
            print("Cart element:", a.name, f"id='{a_id}'", f"class='{cls}'", f"href='{href}'")
        if 'search' in href or 'search' in cls or 'search' in a_id:
            print("Search element:", a.name, f"id='{a_id}'", f"class='{cls}'", f"href='{href}'")
