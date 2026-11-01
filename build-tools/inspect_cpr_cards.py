from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\cpr_section_snippet.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
cards = soup.find_all(class_=lambda c: c and 'cpr-hs__card' in c)
for c in cards:
    print("CARD:", c.get('class'))
    print(c.prettify()[:600])

imgs = soup.find_all(class_=lambda c: c and 'cpr-hs__img' in c)
for img in imgs:
    print("IMG CLASS:", img.get('class'))
    print(img.prettify()[:400])
