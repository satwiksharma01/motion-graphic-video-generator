# Premium Financial Video Engine 📈
### Automated, Sentiment-Aware Motion Graphics for Financial Education.

This is a high-performance **Generative Video Engine** built on [Remotion](https://www.remotion.dev/). It transforms raw financial scripts into premium, documentary-style motion graphics for Instagram Reels, TikTok, and YouTube Shorts automatically.

![Banner](https://img.shields.io/badge/Identity-Educational-teal?style=for-the-badge)
![Tech](https://img.shields.io/badge/Engine-Remotion-0070f3?style=for-the-badge)
![Status](https://img.shields.io/badge/Identity-Trust--Design-blueviolet?style=for-the-badge)

---

## 🚀 Key Innovations

### 🛡️ The "Trust" Design System
Unlike high-hype crypto tools, this engine uses a calibrated visual language designed for **credibility**:
- **Professional Palette:** Uses Deep Teal (Growth/Safety) and Burnt Orange (Caution/Warning) to maintain a serious, trustworthy tone.
- **Calm Typography:** Spring-based animations are tuned for smooth, organic eases rather than aggressive bounces or flashes.
- **Ambient Texture:** Slow-panning data grids provide depth without distracting from the educational content.

### 🧩 3-Tier Safe Zone Architecture
The engine enforces a strict compositional model (1080x1920) to ensure zero UI collision:
1. **The Header (Top 20%):** Auxiliary info like progress bars and glossary footnotes.
2. **The Stage (Central 55%):** Primary motion graphics, charts, and icon arrays.
3. **The Sub Zone (Bottom 25%):** Precise, high-legibility captions that never overlap with the graphics.

### 🧠 Semantic Intelligence
- **Intent-Based VFX Suppression:** The system can detect if a script is "Educational" or "Dramatic." Fact-based scenes about market crashes will automatically suppress aggressive effects like screen-shatters.
- **Auto-Illustrator:** Maps keywords (e.g., "AI", "Risk", "Global") to a premium library of Lucide icons and dynamic themes.
- **Sentiment-Aware Tracks:** Automatically routes background audio based on the text's mood (Bullish vs. Bearish).

---

## 🎬 Scene Component Library
- **GraphicList:** Staggered arrays of animated Data Cards with semantic icons.
- **LineChart:** Clean, single-stroke time-series visualization.
- **BarChart:** High-end comparison graphs for metrics and sector data.
- **Comparison:** Specialized split-screen for comparative financial analysis.
- **Formula:** Mathematical equation rendering for logic-heavy explanations.
- **Hook/CTA:** Polished entry and exit points for maximum viewer retention.

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- FFmpeg (for encoding)

### Installation
```bash
git clone https://github.com/satwiksharma01/motion-graphic-video-generator.git
cd motion-graphic-video-generator
npm install
```

### Rendering a Video
1. Place a `.json` script file in the `scripts/` directory.
2. Run the automation pipeline:
```bash
node scripts/parse-and-render.mjs
```
The final MP4 will be output to the `/out` directory.

### Local Studio View
```bash
npm run dev
```

---

## 📂 Project Structure
- `/src/scenes/` - Premium UI scenes (GraphicList, Charts, etc.).
- `/src/lib/analyzer.ts` - The Semantic Engine logic.
- `/src/lib/colors.ts` - Design tokens and the Trust Palette.
- `/src/FinanceVideo.tsx` - The main composition orchestrator.
- `/scripts/` - JSON video configurations.

---

## 📜 License
This project is for professional financial storytelling. Built with ❤️ for educational clarity.
