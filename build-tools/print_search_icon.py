from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
s_icon = soup.find(class_='hs_header-search')
if s_icon:
    print(s_icon.prettify())
