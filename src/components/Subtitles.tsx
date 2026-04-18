import { COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

const HIGHLIGHT_COLOR = COLORS.purple; 
const SWITCH_CAPTIONS_EVERY_MS = 1800; // Slightly faster for "fast & decisive" feel

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "12%",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: "900",
          fontFamily,
          textAlign: "center",
          maxWidth: "85%",
          lineHeight: "1.1",
          textTransform: "uppercase",
          // Hierarchy sizing - captions are large and impactful
          color: COLORS.textPrimary,
          textShadow: "0px 0px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        {page.tokens.map((token) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{
                color: isActive ? HIGHLIGHT_COLOR : "white",
                transition: "color 0.05s ease-out",
                whiteSpace: "pre-wrap",
                // Glow on active word
                textShadow: isActive ? `0 0 30px ${HIGHLIGHT_COLOR}80` : "none",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Subtitles: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const { fps } = useVideoConfig();

  const { pages } = useMemo(() => {
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    });
  }, [captions]);

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
          startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps
        );
        const durationInFrames = Math.max(1, Math.round(endFrame - startFrame));

        if (durationInFrames <= 0) {
          return null;
        }

        return (
          <Sequence
            key={index}
            from={Math.round(startFrame)}
            durationInFrames={durationInFrames}
          >
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
