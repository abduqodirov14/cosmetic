from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
icons = soup.find_all(class_='hs_header-icon__inner')
for ic in icons:
    print("Icon element:", ic.name, ic.get('class'), ic.prettify()[:250])
