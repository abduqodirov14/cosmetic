from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
fb = soup.find(id='shopify-section-template--27508218462251__hs_floating_feedback_5_bNnN4B')
if fb:
    st = fb.find('style')
    if st:
        print("Style length in feedback section:", len(st.string or ''))
        # save to file
        with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\fb_style.css', 'w', encoding='utf-8') as out:
            out.write(st.string or '')
