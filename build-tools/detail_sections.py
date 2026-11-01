import sys
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

sections = soup.find_all(attrs={"class": re.compile(r"shopify-section")})
for idx, sec in enumerate(sections):
    sec_id = sec.get("id", "")
    print(f"\n==================== SECTION {idx}: {sec_id} ====================")
    
    # Check for videos
    vids = sec.find_all(['video', 'iframe'])
    if vids:
        print("  VIDEOS:")
        for v in vids:
            print("   ", v.name, v.get('src'), [s.get('src') for s in v.find_all('source')])
            
    # Check for images
    imgs = sec.find_all('img')
    if imgs:
        print(f"  IMAGES ({len(imgs)}):")
        for img in imgs[:5]:
            print("   ", img.get('alt', ''), "=>", img.get('src') or img.get('srcset') or img.get('data-src'))
            
    # Check for headings
    headings = sec.find_all(['h1', 'h2', 'h3', 'h4'])
    if headings:
        print("  HEADINGS:")
        for h in headings:
            print(f"    <{h.name}>: {' '.join(h.get_text().split())}")
            
    # Check for buttons / links
    links = sec.find_all(['a', 'button'])
    filtered_links = []
    for l in links:
        t = ' '.join(l.get_text().split())
        if t and len(t) < 50:
            filtered_links.append(f"{l.name}('{t}' -> {l.get('href', '')})")
    if filtered_links:
        print(f"  BUTTONS/LINKS ({len(filtered_links)}):", ", ".join(filtered_links[:8]))
