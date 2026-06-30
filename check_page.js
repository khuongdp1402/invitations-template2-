const puppeteer = require('puppeteer');
const path = require('path');
const OUT = 'C:/Users/ShueiHCM/.gemini/antigravity-ide/brain/c97fc327-0845-4bcc-b0cb-b42297ff00f3';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3002/wedding?side=nhatrai&name=Nguyễn Văn An', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Hero (dark screen with wax seal)
  await page.screenshot({ path: path.join(OUT, 'v2_hero.png') });
  console.log('1. hero');

  // 2. Click wax seal to start
  try { await page.click('button'); } catch(e) {}
  await new Promise(r => setTimeout(r, 5000)); // wait for banner reveal
  await page.screenshot({ path: path.join(OUT, 'v2_banner.png') });
  console.log('2. banner reveal');

  // 3. Chapter 1 - FloatingGallery
  await page.evaluate(() => document.getElementById('chapter-1-meet')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT, 'v2_ch1.png') });
  console.log('3. ch1 gallery');

  // 4. Chapter 2 - Filmstrip (Our Journey)
  await page.evaluate(() => document.getElementById('chapter-2-journey')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT, 'v2_journey.png') });
  console.log('4. journey filmstrip');

  // 4b. Scroll down a bit in filmstrip to see images
  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT, 'v2_journey2.png') });
  console.log('4b. journey scroll');

  // 5. Family
  await page.evaluate(() => document.getElementById('chapter-4-family')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT, 'v2_family.png') });
  console.log('5. family');

  // 6. RSVP
  await page.evaluate(() => document.getElementById('chapter-6-rsvp')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT, 'v2_rsvp.png') });
  console.log('6. rsvp');

  // 7. Ending
  await page.evaluate(() => document.getElementById('chapter-7-ending')?.scrollIntoView({ behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT, 'v2_ending.png') });
  console.log('7. ending');

  await browser.close();
  console.log('All done!');
})();
