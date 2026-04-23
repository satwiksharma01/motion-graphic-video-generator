# PREMIUM FINANCIAL VIDEO ENGINE
## Complete Product Specifications & Feature Catalog

The engine is a high-performance, automated video rendering engine built on **Remotion**. It is designed to transform raw financial data and scripts into premium, documentary-style short-form videos. The engine prioritizes trust, clarity, and sophisticated motion graphics over typical "crypto hype" aesthetics.

---

## 1. Core Visual Identity (The "Trust" Design System)
The engine utilizes a custom design framework called **The Trust Theme**, engineered for high-credibility educational content.

*   **Color Palette (CALM Strategy):**
    *   **Bullish/Growth:** Deep Teal (#0D9488) – Represents safety, organic growth, and stability.
    *   **Bearish/Caution:** Burnt Orange (#EA580C) – Used for warning/cautionary content to avoid alarm fatigue.
    *   **Accent/Neutral:** Indigo/Navy (#6366F1) – Primary branding for metadata and structural UI.
    *   **Backgrounds:** Deep Slate/Navy gradients with cinematic vignetting to focus attention.
*   **Typography:**
    *   **Primary Font:** "Outfit" or "Inter" for maximum legibility and professional aesthetics.
    *   **Typographic Modes:** Supports `impact` (high-energy) and `calm` (educational) modes, with the engine defaulting to `calm` (smooth easing, no aggressive flashes).
*   **Ambient Environment:**
    *   **Abstract Grid Layer:** A slow-panning, transparent node-grid that replaces distracting 3D models, providing a "living" textured background.

---

## 2. Advanced Layout & Geometry (Safe Zone Model)
To maintain a broadcast standard, the engine enforces a strict **Three-Tier Safe Zone** layout.

*   **Top Zone (0-20%):** Auxiliary Information. Reserved for Glossary terms, Progress Trackers, and logos.
*   **Central Stage (20-75%):** Primary Narrative. All charts, icon arrays, and hero text are confined to this `60vh` vertically centered playground.
*   **Bottom Zone (75-100%):** Subtitles & Accessibility. Strict 25% height allocation to ensure captions never obscure primary graphics.

---

## 3. Intelligent Scene Library
The engine features a library of intent-aware scene components that dynamically adapt to the data provided in the JSON script.

*   **Scene Components:**
    *   **Hook Scene:** High-impact hero layout pairing a central 120px icon with primary headlines.
    *   **GraphicList:** Replaces text bullet points with a premium grid of animated "Data Cards," each containing a semantic icon and label.
    *   **LineChart:** Clean, single-stroke time-series visualization with automated scaling and drawing animations.
    *   **BarChart:** Metric-based data visualization with staggered "pop-in" bar animations.
    *   **Comparison Scene:** A split-screen layout for "Before vs After" or "Old vs New" comparisons.
    *   **Formula Scene:** Specifically designed to render mathematical concepts and logic flows clearly.
    *   **Calculation Scene:** Focused on numerical outcomes and ROI metrics.
    *   **Calculation Scene:** Interactive-style numeric reveals.
    *   **CTA (Call to Action):** Simplified closing screen for engagement and follow directives.

---

## 4. The Intelligence Layer (Automation & Analysis)
The "Brain" of the engine that allows it to make autonomous design decisions.

*   **Sentiment Analysis Engine:** 
    *   Parses the `spokenText` of every scene against a 500+ word financial dictionary.
    *   Automatically assigns colors (Teal/Orange) and audio moods based on detected sentiment.
*   **Intent-Based VFX Suppression:**
    *   Controls the "aggression" of the render.
    *   If `intent` is `educational`, the system suppresses screen-shattering, glitch effects, and high-stiffness text bounces.
*   **Semantic Icon Mapping:**
    *   Intelligently maps keywords (e.g., "AI", "Security", "Finance") to a curated library of Lucide React icons.

---

## 5. UI & Overlay System
*   **Persistent Footnotes (Glossary):** Automatically pop-slides definitions for complex jargon in the top right corner.
*   **Dynamic Captions:** TikTok-style animated captions that highlight individual words in real-time based on phonetic timing.
*   **Progress Trackers:** Optional progress bar at the top edge to indicate video completion percentage.

---

## 6. Audio Architecture
*   **Sentiment-Aware Tracks:** The engine automatically routes audio files based on scene mood:
    *   **Bullish:** Calm, uplifting ambient pads.
    *   **Bearish:** Low-frequency tension pads (not aggressive).
    *   **Neutral:** Educational Lo-Fi or steady "tech pulse" backgrounds.
*   **Transition Hits:** Orchestrates subtle sub-bass hits or "swooshes" between scene changes for a polished finish.

---

## 7. Technical Specifications & Stack
*   **Framework:** Remotion 4.0 using React.
*   **Logic Engine:** TypeScript / Node.js for parsing and orchestration.
*   **Rendering:** Headless Chromium rendering for server-side MP4 generation.
*   **Scalability:** JSON-driven workflow allows for bulk rendering of hundreds of videos from a single template.
*   **Icons & Assets:** Lucide React (Icons), Google Fonts (Typography).

---

## 8. Directory Structure
*   `src/components/`: Shared UI components (Subtitles, Glows, Icons).
*   `src/scenes/`: High-level scene components (Hook, GraphicList, etc.).
*   `src/lib/`: Design tokens, sentiment logic, and color constants.
*   `scripts/`: Automation scripts for bulk parsing and rendering.
*   `out/`: Final rendered video exports.

---

## 9. Operation Workflow (JSON-to-Video)
1.  **Input:** A JSON file containing scene metadata, spoken text, and intent flags.
2.  **Analysis:** The engine parses the text, determines sentiment, and selects icons.
3.  **Composition:** Remotion assembles the visual layers and calculates interpolation curves.
4.  **Render:** The engine outputs a broadcast-ready 1080x1920 MP4 file prepared for 9:16 distribution.
