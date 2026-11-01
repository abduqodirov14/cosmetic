from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
fb = soup.find(id='shopify-section-template--27508218462251__hs_floating_feedback_5_bNnN4B')

if fb:
    imgs = fb.find_all('img')
    print("Found images in fb:", len(imgs))
    for img in imgs:
        print("IMG:", img.get('src') or img.get('srcset'))
