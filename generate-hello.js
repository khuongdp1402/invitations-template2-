const TextToSVG = require('text-to-svg');
const fs = require('fs');
const https = require('https');

const fontUrl = 'https://raw.githubusercontent.com/google/fonts/main/ofl/pacifico/Pacifico-Regular.ttf';
const fontPath = 'Pacifico.ttf';

https.get(fontUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download font. Status code: ${res.statusCode}`);
    return;
  }
  const file = fs.createWriteStream(fontPath);
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      try {
        const textToSVG = TextToSVG.loadSync(fontPath);
        const attributes = { fill: 'none', stroke: '#C06C59', 'stroke-width': 2, 'stroke-linecap': 'round' };
        const options = { x: 0, y: 0, fontSize: 100, anchor: 'top baseline', attributes: attributes };
        const svg = textToSVG.getPath('Hello', options);
        console.log(svg);
      } catch (e) {
        console.error(e);
      }
    });
  });
});
