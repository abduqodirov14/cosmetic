import re
import os
from bs4 import BeautifulSoup

base_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone'
index_file = os.path.join(base_dir, 'index.html')

with open(index_file, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

missing_files = []
checked_files = set()

def check_path(rel_path):
    if not rel_path or not rel_path.startswith('.'):
        return
    # clean query string
    clean_rel = rel_path.split('?')[0].replace('/', os.sep)
    abs_path = os.path.normpath(os.path.join(base_dir, clean_rel))
    if abs_path not in checked_files:
        checked_files.add(abs_path)
        if not os.path.exists(abs_path):
            missing_files.append((rel_path, abs_path))

# Check link href
for l in soup.find_all('link'):
    check_path(l.get('href'))

# Check script src
for s in soup.find_all('script'):
    check_path(s.get('src'))

# Check img src and srcset
for img in soup.find_all('img'):
    check_path(img.get('src'))
    srcset = img.get('srcset')
    if srcset:
        for p in srcset.split(','):
            toks = p.strip().split(' ')
            check_path(toks[0])

# Check video src
for v in soup.find_all('video'):
    check_path(v.get('src'))

print(f"Total local references checked: {len(checked_files)}")
if missing_files:
    print(f"Found {len(missing_files)} missing files:")
    for rel, ab in missing_files:
        print("  MISSING:", rel, "->", ab)
else:
    print("ALL local files exist perfectly on disk! No broken references.")
