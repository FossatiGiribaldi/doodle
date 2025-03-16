// index.js
const puppeteer = require('puppeteer');
const fs = require('fs');

(async function () {

    const browser = await puppeteer.launch({ headless: true, });

    const page = await browser.newPage();

    await page.goto('https://fos.super.site/armor');

    const result = await page.$$eval('.notion-collection-table__body tr', trList => {

        console.log(trList)

        return trList.map(tr => {

            const file = tr.querySelector('.file a')
            const title = tr.querySelector('.title')
            const multiSelect = tr.querySelector('.multi_select')

            return {
                file: file.href,
                title: title.textContent,
                multiSelect: multiSelect.textContent,
            }
        });

    })

    fs.writeFileSync('result.json', JSON.stringify(result));

    await browser.close()

})();