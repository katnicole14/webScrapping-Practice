const puppeteer = require("puppeteer");

(async () =>{
   const browser = await puppeteer.launch({headless: false}); 
   const page = await browser.newPage();
   await page.goto("https://www.amazon.com/hz/wishlist/intro");
   await page.screenshot({path:"mywebsite.png"}); //get the screenshot of the page 

//   const grabParagraph = await page.evaluate(()=>{ //evaluate the page 
//     const pgTag = document.querySelector("industry" ||"classification") //can get element with any element 
//   })

const currentURL = page.url();

const pageContent = await page.evaluate(() => document.body.textContent);
const industryRegex = /(industry|sector|classification)/i;
//const matches = pageContent.match(industryRegex);
const matches = currentURL.match(industryRegex);

if (matches) {
    const industryClassification = matches[0];
    console.log('Industry Classification:', industryClassification);
  } else {
    console.log('Industry classification not found on the page.');
  }
   await browser.close();
})();