from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
loc = soup.find(class_=lambda c: c and 'localization' in c)
if loc:
    print(loc.prettify()[:600])
else:
    print("No localization form found!")
