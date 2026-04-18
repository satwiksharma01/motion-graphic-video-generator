import React from "react";
import { Composition, CalculateMetadataFunction } from "remotion";
import { FinanceVideo, FinanceVideoProps } from "./FinanceVideo";

const calculateMetadata: CalculateMetadataFunction<FinanceVideoProps> = async ({
  props,
  defaultProps,
}) => {
  const fps = 30; // Matches Composition fps
  const scenes = props.scenes || defaultProps.scenes;
  const transitionDuration = Math.round(0.5 * fps);

  let totalDuration = 0;
  let overlappingTransitionsCount = 0;

  for (let i = 0; i < scenes.length; i++) {
    totalDuration += scenes[i].durationInFrames;

    if (i > 0) {
      // Overlays (light leaks) used in calculation/linechart don't shrink the timeline.
      // Transitions (slide/fade) used in others DO shrink the timeline.
      if (scenes[i].type !== "calculation" && scenes[i].type !== "linechart") {
        overlappingTransitionsCount++;
      }
    }
  }

  const finalDuration = totalDuration - (overlappingTransitionsCount * transitionDuration);

  return {
    durationInFrames: Math.max(1, finalDuration),
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FinanceVideo"
        component={FinanceVideo}
        durationInFrames={120} // Will be overwritten by calculateMetadata
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={calculateMetadata}
        defaultProps={{
          scenes: [
            {
              type: "hook",
              title: "Markets are Rising?",
              durationInFrames: 120,
              spokenText: "Wait… this doesn’t make sense. Fear in the market is extremely high right now. Like… panic levels."
            },
            {
              type: "linechart",
              title: "Extreme Fear (17)",
              dataPoints: [70, 65, 50, 30, 17],
              durationInFrames: 180,
              spokenText: "The Fear & Greed Index is at 17. That’s “Extreme Fear”. Usually when this happens… markets fall."
            },
            {
              type: "steps",
              title: "But Today...",
              items: [
                "Indian markets surged",
                "Crypto rallied hard",
                "Global markets steady"
              ],
              durationInFrames: 240,
              spokenText: "But today? Indian markets surged. Crypto rallied hard. Even global markets held steady. So now the question is— If everyone is scared… why are markets going up?"
            },
            {
              type: "linechart",
              title: "Money Flowing In",
              dataPoints: [20, 35, 50, 75, 95],
              durationInFrames: 180,
              spokenText: "Here’s the part most people don’t understand. Markets don’t move based on how people feel. They move based on what people do with money. And right now… money is still flowing in."
            },
            {
              type: "steps",
              title: "Positive Triggers",
              items: [
                "Ceasefire talks",
                "Policy signals",
                "Positioning shifts"
              ],
              durationInFrames: 210,
              spokenText: "Because expectations changed. Ceasefire talks. Policy signals. Positioning shifts. Even a small positive trigger… can push markets higher."
            },
            {
              type: "hook",
              title: "Less Selling Pressure",
              durationInFrames: 180,
              spokenText: "And here’s something even more important— When people are already fearful… they’ve already reduced risk. They’ve already sold. So there’s less selling pressure left."
            },
            {
              type: "cta",
              subtitle: "Sentiment vs Price",
              buttonText: "Price usually wins",
              durationInFrames: 180,
              spokenText: "Which means… even a little buying can move markets a lot. And that’s why… when sentiment and price disagree— price usually wins."
            }
          ]
        }}
      />
    </>
  );
};