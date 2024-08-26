import { IGNORE_CSS_SELECTORS, ROOT, SCRAPE_CSS_SELECTOR, SUBPAGES } from './config';
import puppeteer, { Page } from 'puppeteer';

import fs from 'fs';
import path from 'path';

function buildUrlToScrape(page: string) {
    return `${ROOT}${page}`;
}

async function savePdf(page: Page, savePath: string, filename: string) {
    const pdf = await page.pdf({ format: 'A4' });
    const pdfFilePath = path.join(savePath, `${filename}.pdf`);

    await fs.promises.writeFile(pdfFilePath, pdf);
}

async function adjustPageContent(page: Page) {
    for (const ignoreClass of IGNORE_CSS_SELECTORS) {
        await page.$$eval(ignoreClass, (pageElements) => pageElements.forEach((el) => el.remove()));
    }
    const content = await page.content();
    await page.setContent(content);
    return page
}

async function scrapePageToPdf(pageUrl: string, filename: string, page: Page, savePath: string) {
    try {
        await page.goto(buildUrlToScrape(pageUrl));
        await page.waitForSelector(SCRAPE_CSS_SELECTOR, { timeout: 60_000 });

        const adjustedPage = await adjustPageContent(page)

        await savePdf(adjustedPage, savePath, filename);
    } catch (error) {
        console.error(`Failed to scrape ${pageUrl} to PDF:`, error);
    }
}

async function createDirectoryIfNotExists(directory: string) {
    const pdfDirectory = path.join(__dirname, '..', directory);
    try {
        await fs.promises.access(pdfDirectory);
        return pdfDirectory
    } catch (error) {
        await fs.promises.mkdir(pdfDirectory, { recursive: true });
        console.log('Created pdf directory!')
        return pdfDirectory
    }
}

export default async function scrapePagesToPdfs() {
    const browser = await puppeteer.launch();
    const browserPage = await browser.newPage();
    
    let index = 1;
    const pagesLength = SUBPAGES.length;

    const pdfDirectory = await createDirectoryIfNotExists('pdf');
    
    for (const page of SUBPAGES) {
        console.log(`Scraping ${index} out of ${pagesLength} pages`);
        await scrapePageToPdf(page, index.toString(), browserPage, pdfDirectory);
        index += 1;
    }
    
    console.log('FINISHED SCRAPING!')

    await browser.close();
}