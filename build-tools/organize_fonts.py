import os
import shutil

src_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\images'
fonts_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\fonts'
os.makedirs(fonts_dir, exist_ok=True)

font_exts = ('.woff', '.woff2', '.otf', '.ttf')
for f in os.listdir(src_dir):
    if any(f.endswith(ext) for ext in font_exts):
        src_file = os.path.join(src_dir, f)
        dest_file = os.path.join(fonts_dir, f)
        shutil.move(src_file, dest_file)
        print(f"Moved font: {f}")
