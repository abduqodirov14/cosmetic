import os
import re

img_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\images'
local_images = os.listdir(img_dir)
print(f"Total local images: {len(local_images)}")

# Build a mapping from original url / basename to local relative path
mapping = {}
for fname in local_images:
    mapping[fname] = f"./assets/images/{fname}"

print("Sample mappings:")
for k, v in list(mapping.items())[:10]:
    print(f"  {k} -> {v}")
