import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

target_sections = [
    'shopify-section-template--27508218462251__home_scroll_video_k4rtxF',
    'shopify-section-template--27508218462251__overlapping_image_spacer_4cgQrE',
    'shopify-section-template--27508218462251__cpr_hero_scroll_7_9BNbMM',
    'shopify-section-template--27508218462251__aardvark_flow_cards_5_BPJMr4',
    'shopify-section-template--27508218462251__curved_scroll_stats_WBtCQ8',
    'shopify-section-template--27508218462251__hs_floating_feedback_5_bNnN4B',
    'shopify-section-template--27508218462251__hocl_ritual_cloud_2_YQKz9w',
    'shopify-section-template--27508218462251__hs_featured_collection_GNmkLh',
    'shopify-section-template--27508218462251__hs_newsletter_njdCRN',
    'shopify-section-sections--27508218658859__hs_footer_VxjwCx'
]

for s_id in target_sections:
    sec = soup.find(id=s_id)
    print(f"\n==================== {s_id} ====================")
    if sec:
        # Print first 1000 characters of clean inner HTML or text
        print(sec.prettify()[:1200])
    else:
        print("NOT FOUND")
