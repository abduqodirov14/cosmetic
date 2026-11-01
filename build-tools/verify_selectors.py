from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("1. Video scroll section (.sv-scroll-video):", bool(soup.find(class_='sv-scroll-video')))
print("2. CPR hero scroll (#cpr-hs-template--27508218462251__cpr_hero_scroll_7_9BNbMM):", bool(soup.find(id='cpr-hs-template--27508218462251__cpr_hero_scroll_7_9BNbMM')))
print("3. Aardvark flow cards ([data-flow-list]):", bool(soup.find(attrs={'data-flow-list': True})))
print("4. Curved stats ([data-cs-config]):", bool(soup.find(attrs={'data-cs-config': True})))
print("5. Ritual cloud (#rc-template--27508218462251__hocl_ritual_cloud_2_YQKz9w):", bool(soup.find(id='rc-template--27508218462251__hocl_ritual_cloud_2_YQKz9w')))
print("   - .rc-data in ritual cloud:", bool(soup.find(class_='rc-data')))
print("   - canvas.rc-lines:", bool(soup.find('canvas', class_='rc-lines')))
print("6. Cart drawer button (#cart-icon-bubble):", bool(soup.find(id='cart-icon-bubble')))
