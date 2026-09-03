import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

// Check menu is closed initially
const menuClosed = await page.evaluate(() => {
  const fixed = document.querySelector('.fixed');
  return !fixed || getComputedStyle(fixed).display === 'none';
});
console.log('Menu closed initially:', menuClosed);

// Click menu button
const menuBtn = page.getByLabel('Open menu');
await menuBtn.click();
await page.waitForTimeout(300);

// Check menu is now open
const menuOpen = await page.evaluate(() => {
  const panel = document.querySelector('.fixed.inset-y-0');
  const hasLogin = panel?.textContent?.includes('Login');
  const hasCategories = panel?.textContent?.includes('Categories');
  const hasPages = panel?.textContent?.includes('Pages');
  const hasAboutUs = panel?.textContent?.includes('About Us');
  return { display: panel ? getComputedStyle(panel).display : null, hasLogin, hasCategories, hasPages, hasAboutUs };
});
console.log('Menu open:', JSON.stringify(menuOpen));

// Close via close button
const closeBtn = page.getByLabel('Close menu');
await closeBtn.click();
await page.waitForTimeout(300);

const menuClosedAgain = await page.evaluate(() => {
  const panel = document.querySelector('.fixed.inset-y-0');
  return !panel || getComputedStyle(panel).display === 'none';
});
console.log('Menu closed after close:', menuClosedAgain);

// Re-open and close via backdrop
await page.getByLabel('Open menu').click();
await page.waitForTimeout(300);
const backdrop = page.locator('.fixed.inset-0.bg-black\/40');
await backdrop.click({ position: { x: 380, y: 400 } });
await page.waitForTimeout(300);
const menuClosedBackdrop = await page.evaluate(() => {
  const panel = document.querySelector('.fixed.inset-y-0');
  return !panel || getComputedStyle(panel).display === 'none';
});
console.log('Menu closed via backdrop:', menuClosedBackdrop);

await browser.close();
