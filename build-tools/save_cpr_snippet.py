from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
cpr = soup.find(id='shopify-section-template--27508218462251__cpr_hero_scroll_7_9BNbMM')
if cpr:
    # Save the section html cleanly
    with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\cpr_section_snippet.html', 'w', encoding='utf-8') as out:
        out.write(cpr.prettify())
    print("Saved cpr_section_snippet.html, length:", len(str(cpr)))
