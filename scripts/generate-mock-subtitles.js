const fs = require('fs');
const path = require('path');

const script = "Did you know compound interest can make you rich? Albert Einstein called it the eighth wonder of the world. Let's see how it works with an example. Ten thousand dollars invested at seven percent for thirty years... Seventy six thousand one hundred and twenty two dollars. Power of starting early! Start investing early. Choose low cost index funds. Contribute consistently. Let compound interest work. Start investing today! Visit our website for more tips.";

const words = script.split(' ');

const captions = words.map((word, index) => {
  // Let's assume each word takes roughly 400ms to speak.
  const wordDuration = 400;
  const startMs = index * wordDuration;
  const endMs = startMs + wordDuration;
  
  return {
    text: index === 0 ? word : ` ${word}`, // Prefix space except for the first word
    startMs,
    endMs,
    timestampMs: startMs,
    confidence: 1.0
  };
});

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'subtitles.json'), JSON.stringify(captions, null, 2));

console.log('Mock subtitles generated successfully at public/subtitles.json');
