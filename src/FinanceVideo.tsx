import React, { useState, useEffect, useCallback } from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { LightLeak } from "@remotion/light-leaks";
import type { Caption } from "@remotion/captions";

import { GridBackground } from "./components/GridBackground";
import { Subtitles } from "./components/Subtitles";
import { VideoAudio } from "./components/VideoAudio";
import { AbstractGridBackground } from "./components/AbstractGridBackground";
import { Hook } from "./scenes/Hook";
import { Calculation } from "./scenes/Calculation";
import { Steps } from "./scenes/Steps";
import { CTA } from "./scenes/CTA";
import { useDelayRender } from "remotion";
import { LineChart } from "./scenes/LineChart";
import { BarChart } from "./scenes/BarChart";
import { GraphicList } from "./scenes/GraphicList";
import { Comparison } from "./scenes/Comparison";
import { Formula } from "./scenes/Formula";
import { GeometricShatter } from "./components/GeometricShatter";
import { GlossaryOverlay } from "./components/GlossaryOverlay";
import { LowerThirds } from "./components/LowerThirds";
import { ProgressTracker } from "./components/ProgressTracker";
import { analyzeSentiment, analyzeIcon, getSceneSeed, deriveLayout } from "./lib/analyzer";
import { COLORS } from "./lib/colors";

export type FinanceVideoProps = {
  scenes: SceneData[];
  captions?: Caption[];
};

export const FinanceVideo: React.FC<FinanceVideoProps> = ({
  scenes,
  captions: initialCaptions,
}) => {
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[] | null>(initialCaptions || null);
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender());

  const fetchCaptions = useCallback(async () => {
    if (initialCaptions) {
      continueRender(handle);
      return;
    }
    try {
      const response = await fetch(staticFile("subtitles.json"));
      if (!response.ok) {
        throw new Error("Could not find subtitles.json");
      }
      const data = await response.json();
      setCaptions(data);
    } catch (e) {
      console.warn("Could not load subtitles", e);
      setCaptions([]);
    } finally {
      continueRender(handle);
    }
  }, [continueRender, handle, initialCaptions]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  if (captions === null) return null;

  const transitionDuration = Math.round(0.5 * fps);

  return (
    <GridBackground>
      {/* Global audio layer */}
      <VideoAudio />

      {/* Educational Ambient Background */}
      <AbstractGridBackground />

      <TransitionSeries>
        {scenes.map((scene, index) => {
          // Derive values if missing
          const textToAnalyze = scene.spokenText || (scene.type === "hook" ? scene.title : "");
          const seed = getSceneSeed(textToAnalyze + index);
          
          const sentiment = scene.sentiment || analyzeSentiment(textToAnalyze);
          const iconName = scene.iconName || analyzeIcon(textToAnalyze);
          const layoutVariant = scene.layoutVariant || deriveLayout(seed);
          const intent = scene.intent || "educational";

          let SceneComponent;

          if (scene.type === "hook") {
            SceneComponent = (
              <Hook 
                title={scene.title} 
                sentiment={sentiment} 
                iconName={iconName} 
                layoutVariant={layoutVariant}
              />
            );
          } else if (scene.type === "calculation") {
            SceneComponent = <Calculation amount={scene.amount} result={scene.result} sentiment={sentiment} />;
          } else if (scene.type === "linechart") {
            SceneComponent = (
              <LineChart 
                dataPoints={scene.dataPoints} 
                sentiment={sentiment} 
                title={scene.title} 
              />
            );
          } else if (scene.type === "barchart") {
            SceneComponent = (
              <BarChart 
                dataPoints={scene.dataPoints} 
                sentiment={sentiment} 
                title={scene.title} 
              />
            );
          } else if (scene.type === "graphiclist") {
            SceneComponent = (
              <GraphicList 
                items={scene.items} 
                sentiment={sentiment} 
                title={scene.title} 
              />
            );
          } else if (scene.type === "steps") {
            SceneComponent = (
              <Steps 
                title={scene.title} 
                items={scene.items} 
                sentiment={sentiment} 
                iconName={iconName} 
                layoutVariant={layoutVariant}
              />
            );
          } else if (scene.type === "cta") {
            SceneComponent = (
              <CTA 
                subtitle={scene.subtitle} 
                buttonText={scene.buttonText} 
                sentiment={sentiment} 
              />
            );
          } else if (scene.type === "comparison") {
            SceneComponent = (
              <Comparison 
                title={scene.title}
                itemA={scene.itemA}
                itemB={scene.itemB}
              />
            );
          } else if (scene.type === "formula") {
            SceneComponent = (
              <Formula 
                title={scene.title}
                equation={scene.equation}
                variables={scene.variables}
              />
            );
          } else {
            return null;
          }

          const elements = [];

          // Transitions — sentiment-aware
          if (index > 0) {
            if (scene.type === "linechart" || scene.type === "calculation") {
              // Light leak: red hue for bearish, purple (270deg) for neutral/bullish
              const hueShift = sentiment === "bearish" ? 0 : sentiment === "bullish" ? 120 : 270;
              elements.push(
                <TransitionSeries.Overlay key={`overlay-${index}`} durationInFrames={Math.round(0.8 * fps)}>
                  <LightLeak seed={index * 7} hueShift={hueShift} />
                </TransitionSeries.Overlay>
              );
            } else if (scene.type === "steps") {
              elements.push(
                <TransitionSeries.Transition
                  key={`trans-${index}`}
                  presentation={slide({ direction: "from-bottom" })}
                  timing={linearTiming({ durationInFrames: transitionDuration })}
                />
              );
            } else {
              elements.push(
                <TransitionSeries.Transition
                  key={`trans-${index}`}
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: transitionDuration })}
                />
              );
            }
          }

          // Add the actual sequence — add shatter overlay on bearish scenes
          elements.push(
            <TransitionSeries.Sequence key={`seq-${index}`} durationInFrames={scene.durationInFrames}>
              {SceneComponent}
              {/* Bearish crash shatter — plays first 45 frames of the scene */}
              {sentiment === "bearish" && intent !== "educational" && (
                <AbsoluteFill style={{ pointerEvents: "none" }}>
                  <GeometricShatter color={COLORS.bearish} shardCount={20} duration={45} />
                </AbsoluteFill>
              )}
              {/* Overlays */}
              {scene.glossaryTerm && scene.glossaryDefinition && (
                <GlossaryOverlay term={scene.glossaryTerm} definition={scene.glossaryDefinition} />
              )}
              {scene.lowerThirdText && scene.lowerThirdStatValue !== undefined && (
                <LowerThirds title={scene.lowerThirdText} value={scene.lowerThirdStatValue} />
              )}
              {/* Progress Tracker (per scene relative tracking) */}
              <ProgressTracker currentIndex={index} total={scenes.length} />
            </TransitionSeries.Sequence>
          );

          return elements;
        })}
      </TransitionSeries>

      <Subtitles captions={captions} />
    </GridBackground>
  );
};