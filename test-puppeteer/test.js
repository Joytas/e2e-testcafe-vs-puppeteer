const puppeteer = require('puppeteer');

describe('e2e', () => {
    jest.setTimeout(60000);

    it('bbc weather test', async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        //go to home page
        await page.goto('http://www.bbc.com');
        await page.screenshot({path: __dirname + '/01-bbc.png'});
        expect(page.url()).toBe('http://www.bbc.com/');

        //navigate to 'weather' tab
        const navWeather = page.waitForNavigation();
        await page.click('.orb-nav-weather');
        await navWeather;
        await page.screenshot({path: __dirname + '/02-weather-tab.png'});
        expect(page.url()).toMatch('weather');

        //search for location
        await expect(page).toFill('input#ls-c-search__input-label', 'EC4A');
        await page.waitForSelector('li.ls-c-locations-list-item');
        await page.screenshot({path: __dirname + '/03-locations.png'});
        const locations = await page.$$('li.ls-c-locations-list-item');
        expect(locations).toHaveLength(1);

        //navigate to location
        const navLocation = page.waitForNavigation();
        await locations[0].click();
        await navLocation;
        await page.screenshot({path: __dirname + '/04-ec4a.png'});
        expect(page.url()).toMatch('ec4a');
        await expect(page.title()).resolves.toMatch('EC4A');

        await browser.close();
    });
});

