// index.js
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.douban.com/');

  // 提取页面标题
  const title = await page.title();

  // 将标题保存到文件中
  fs.writeFileSync('result.txt', title);

  await browser.close();
})();