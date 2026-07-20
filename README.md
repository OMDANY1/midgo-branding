# MIDGO — Premium Interactive Brand Experience

A custom, award-winning interactive brand experience website designed and built for **MIDGO**, a premium digital dermatology education platform from Saudi Arabia.

Designed around the theme of: **"Your First Destination to Understand Your Skin"** (Education First. Treatment Second.)

This project is built to showcase a highly polished, responsive, and bilingual design system that brings the brand identity to life in an immersive browser experience.

---

## 🏛 Brand Identity & Visual System

- **Visual Tone**: Inspired by Apple Health, Linear, Headspace, and luxury medical design. Embraces Japanese minimalism and Swiss Grid layouts.
- **Color Palette**: Custom luxury clinical tones. Replaces cheap blues and pharmacy greens with natural, warm earth tones:
  - Deep Plum (`#4A3548`)
  - Warm Bronze (`#C9A88C`)
  - Warm Stone (`#E8E0D8`)
  - Warm White (`#FAF7F4`)
  - Deep Charcoal (`#2C2428`)
  - Soft Olive (`#8A9A7B`)
- **Typography Scale**: Pairing elegant serifs (Cormorant Garamond / Noto Naskh Arabic) with highly readable sans-serifs (Inter / IBM Plex Sans Arabic).
- **8pt Grid**: Precise layout alignments across all responsive grid breakpoints.

---

## 🛠 Features Implemented

1. **Animated Hero Reveal**: Viewport header and tagline with smooth, staggered letter reveals.
2. **Instant Translation Engine**: Seamless on-the-fly toggling between English (LTR) and Arabic (RTL) without reloading the page. Alignment directions, margin flow, and font families adjust dynamically.
3. **Swiss Grid Inspector**: Floating view button that overlays a 12-column bronze grid to inspect layouts.
4. **Interactive Swatches**: Click swatches to copy Hex codes directly to your clipboard, showing elegant toast confirmations.
5. **Interactive Personality Cards**: Reveals percentages (Doctor 70%, Mentor 20%, Friend 10%) on scroll with smooth progress bar growth.
6. **Iconography & Illustration**: Custom-coded minimal inline SVGs (1.5px stroke width) showing biological structures and clinical icons.
7. **Premium Mockups**: High-end mockups of future packaging, digital ebooks, mobile app screens, and social media carousels.

---

## 📂 Project Structure

```
midgo-branding/
├── index.html        # Main interactive layout (all 20 sections)
├── css/
│   ├── tokens.css    # Color and typography design tokens
│   ├── base.css      # CSS resets and utility layout helpers
│   ├── layout.css    # 12-column Swiss Grid responsive columns
│   ├── components.css# Custom buttons, input states, mockups, color swatches
│   └── sections.css  # Unique sections layout and scroll animation classes
├── js/
│   └── app.js        # Main JavaScript controller (Intersection Observer, translation logic)
├── assets/           # Original and generated high-end visual mockups
└── README.md         # Documentation
```

---

## 🚀 Running Locally

This project is built with vanilla HTML/CSS/JS (zero dependencies) to ensure raw loading speeds and instant response times.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/OMDANY1/midgo-branding.git
   ```
2. **Open in browser**:
   Double click `index.html` or run a local server:
   ```bash
   npx serve .
   ```

---

## ⚖ Compliance & Quality

- **100% Valid HTML5**: Validated using `html-validate`.
- **WCAG Accessible**: Uses semantic HTML5 landmarks and includes a fully accessible form submit mechanism.
- **No Inline Styling**: Fully stylesheet-driven layout utilities.
- **Perfect Performance**: Fast load times with optimised SVGs and images.
