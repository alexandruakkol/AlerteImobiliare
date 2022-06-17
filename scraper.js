const puppeteer = require('puppeteer');

async function scrape(){
    let url = 'https://www.olx.ro/d/imobiliare/apartamente-garsoniere-de-vanzare/bucuresti/';
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let ads = [];
        let pageNo = 1;

        await page.goto(url, { waitUntil: "networkidle0" });
        const data = await page.evaluate(() => {
            
            return Array.from(document.querySelectorAll('[data-cy="l-card"]')).map((elm)=>
                {return [
                    {'title':elm.querySelector("a > div > div > div.css-9nzgu8 > div.css-u2ayx9 > h6").textContent},
                    {'price':elm.querySelector("a > div > div > div.css-9nzgu8 > div.css-u2ayx9 > p").textContent.split('€')[0]+'€'},
                    {'area':elm.querySelector("a > div > div > div.css-9nzgu8 > div:nth-child(2) > p.css-1bhbxl1-Text.eu5v0x0").textContent},
                    {'link':elm.querySelector("a").href}
                
                ]
                
                });
        });
        console.log('data',data)
        await browser.close();
        return data;
    } catch (err) {
        console.error(err);
    }
}

console.log(scrape())