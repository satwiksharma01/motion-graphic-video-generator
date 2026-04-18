import fs from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Generate Subtitles from text snippets
function generateSubtitlesArray(textArr) {
  const fullText = textArr.filter(Boolean).join(" ");
  if (!fullText) return [];

  const words = fullText.split(" ");
  return words.map((word, index) => {
    const wordDuration = 350; // Mock 350ms per word
    const startMs = index * wordDuration;
    const endMs = startMs + wordDuration;
    
    return {
      text: index === 0 ? word : ` ${word}`,
      startMs,
      endMs,
      timestampMs: startMs,
      confidence: 1.0
    };
  });
}

function extractSpokenText(scene) {
  if (scene.spokenText) return scene.spokenText;
  if (scene.type === "hook") return scene.title;
  if (scene.type === "calculation") return `With a starting amount of ${scene.amount}, it grows to ${scene.result}!`;
  if (scene.type === "steps") return (scene.title || "The steps are: ") + scene.items.join(". ");
  if (scene.type === "cta") return (scene.subtitle || "") + " " + (scene.buttonText || "");
  return "";
}

async function renderVideos() {
  const scriptsDir = __dirname;
  const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith(".json") && f !== "package.json" && f !== "package-lock.json" && f !== "tsconfig.json");

  if (files.length === 0) {
    console.log("No dynamic .json scripts found in scripts directory.");
    return;
  }

  console.log("Bundling video project...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, "..", "src", "index.ts"),
    webpackOverride: (config) => config,
  });

  const outDir = path.resolve(__dirname, "..", "out");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  for (const file of files) {
    console.log(`\nProcessing ${file}...`);
    const filePath = path.join(scriptsDir, file);
    
    let parsedData;
    try {
      parsedData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch(e) {
      console.error(`Skipping ${file}: Invalid JSON.`);
      continue;
    }

    if (!parsedData.scenes || !Array.isArray(parsedData.scenes)) {
      console.error(`Skipping ${file}: Must contain a 'scenes' array.`);
      continue;
    }
    
    const spokenTexts = parsedData.scenes.map(extractSpokenText);
    const captions = generateSubtitlesArray(spokenTexts);

    const inputProps = {
      scenes: parsedData.scenes,
      captions,
    };

    console.log(`Extracting composition...`);
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "FinanceVideo",
      inputProps,
    });

    const outputName = file.replace(".json", ".mp4");
    const outputPath = path.join(outDir, outputName);

    console.log(`Rendering ${outputPath} (this may take a minute)...`);
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputPath,
      inputProps,
    });
    console.log(`✅ Successfully generated video at ${outputPath}`);
  }
}

renderVideos().catch(err => {
  console.error("Error rendering videos:", err);
  process.exit(1);
});
