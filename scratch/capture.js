const puppeteer = require('puppeteer');
const path = require('path');

const OUT = 'C:/Users/ShueiHCM/.gemini/antigravity-ide/brain/c97fc327-0845-4bcc-b0cb-b42297ff00f3';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log('Navigating...');
  await page.goto('http://localhost:3002/wedding?side=nhatrai&name=TestGuest', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: path.join(OUT, 'ss_hero.png') });
  console.log('hero captured');

  // Click wax seal
  try {
    // Look for the canvas inside the transparent wax seal wrapper
    await page.click('canvas');
    console.log('Clicked wax seal canvas');
    await new Promise(r => setTimeout(r, 12000));
    await page.screenshot({ path: path.join(OUT, 'ss_after_click.png') });
    console.log('after_click captured');
  } catch(e) {
    console.log('No seal canvas to click:', e.message);
  }

  // Scroll to sections
  const sections = ['chapter-1-meet', 'chapter-4-family', 'chapter-6-rsvp', 'chapter-7-ending'];
  for (const id of sections) {
    await page.evaluate((s) => {
      const el = document.getElementById(s);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, id);
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT, `ss_${id}.png`) });
    console.log(`${id} captured`);
  }

  await browser.close();
  console.log('All done!');
})();
