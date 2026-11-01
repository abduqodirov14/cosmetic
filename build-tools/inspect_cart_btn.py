from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
cart_btn = soup.find(class_='hs_header-cart__js')
if cart_btn:
    print(cart_btn.prettify())
