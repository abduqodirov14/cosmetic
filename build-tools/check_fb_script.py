from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
fb = soup.find(id='shopify-section-template--27508218462251__hs_floating_feedback_5_bNnN4B')
if fb:
    s = fb.find_all('script')
    print("Scripts in feedback section:", len(s))
    for scr in s:
        print("Script text len:", len(scr.string or ''))
        print((scr.string or '')[:300])
