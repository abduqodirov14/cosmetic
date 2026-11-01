# cosmetic

A modern, high-fidelity, interactive, and responsive skincare & cosmetics web application.

---

## 🔬 Features & Cloned Architecture

1. **Header & Navigation**:
   - Announcement bar with complimentary shipping reminder.
   - Customizable brand logo (`YOUR TITLE`) and full navigation hierarchy (Do'kon, Ma'lumot, Biz haqimizda, Bog'lanish).
   - Live interactive search button with instant drawer.
   - Live interactive bag/cart counter badge.
   - Interactive Multi-Currency Switcher (UZS, USD, EUR, AED) with real-time price conversion.

2. **Hero Scroll Video Scrubbing**:
   - Sticky pinned full-viewport interactive video scrub driven by scroll progress.
   - Seamless responsive fallback for mobile and reduced-motion modes.

3. **CPR Face Mist Hero Scroll & Interactive Before/After Comparison**:
   - Pinned scroll progress animation.
   - Floating 3D lens bottle visual and scientific claim badges.
   - **Interactive Before & After Split Comparison Slider** with draggable divider handle to inspect real skin acne vs healed barrier transformation.

4. **"How It Works" Flow Cards (Aardvark Elastic Fan Cards)**:
   - 5 interactive cards with Boska typography and custom visuals:
     1. *Cutibacterium acnes bakteriyalarini yo'qotadi*
     2. *Yallig'lanishni to'xtatadi*
     3. *Teri himoya to'sig'ini tiklaydi*
     4. *Mikrobiomani himoya qiladi*
     5. *Tabiiy pH darajasini tiklaydi*
   - Powered by elastic spring physics.

5. **Curved Scroll Stats Ribbon**:
   - Dynamic SVG wavy text ribbon flowing seamlessly on scroll.

6. **Real Skin, Real Experiences (Floating Feedback)**:
   - Interactive customer review cards featuring 5-star ratings, verified badges, and before/after customer photo evidence.

7. **Interactive 3D Ritual Cloud (Canvas & Physics Engine)**:
   - Rotating 3D neural sphere with linked moment tags (`/post-gym`, `/breakout-sos`, `/daily-cpr`, `/flight-mode`, etc.).
   - Pointer-drag rotating, mouse hover deceleration.
   - **Click-to-Inspect**: Clicking any ritual spins it to the front and opens a modal with chemistry breakdown, instructions, and 1-click **Add Ritual to Bag**!

8. **Featured Products Collection**:
   - **CPR Face Mist**: with interactive size variant pills (120ml / 60ml / 30ml) and dynamic pricing.
   - **CPR Body Mist**
   - **MAYDAY Tonic Face Pads**
   - **ORYNEA Eyelid & Lash Mist**

9. **Fully Functional Slide-Out Bag / Cart Drawer**:
   - Slide-in panel from the right.
   - Add to bag with toast notifications and badge updates.
   - Dynamic Free Shipping Progress Bar.
   - Quantity increment/decrement, line-item removal, and persistent storage in `localStorage`.
   - Checkout demonstration modal.

10. **Live Search Drawer**:
    - Real-time search query filtering across all products and concerns with instant image previews and quick action buttons.

11. **Social Integration**:
    - Clean Instagram integration linked to official profile.

12. **Complete Asset Packaging**:
    - All fonts (General Sans, Boska, Assistant), images, SVGs, and hero video downloaded locally in `./assets/` for fast, offline-capable rendering.

---

## 🚀 How to Run Locally

```bash
python -m http.server 8080
```
Then open: **`http://localhost:8080`** in your browser.

---

## 📁 Directory Structure

```
cosmetic/
├── index.html                  # Main website
├── package.json                # Project info & scripts
├── README.md                   # Documentation
├── assets/
│   ├── css/                    # Stylesheets & font declarations
│   │   ├── fonts.css
│   │   ├── base.css
│   │   ├── styles.css
│   │   ├── hs-custom.css
│   │   ├── hs-products.css
│   │   ├── component-*.css
│   │   └── app.css             # Custom interactive & responsive polish
│   ├── fonts/                  # General Sans, Boska, Assistant fonts
│   ├── images/                 # Product bottles, before/after photos, logos
│   ├── videos/
│   │   └── hero_scroll.mp4     # Pinned hero scroll video
│   └── js/
│       ├── script_*.js         # Specialized animation scripts
│       └── app.js              # Cart drawer, search modal, variants, currency
```
