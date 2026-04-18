import { loadFont } from "@remotion/google-fonts/Montserrat";

// Montserrat — bold, modern, highly legible. The voice of the Noctis engine.
const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export { fontFamily };
