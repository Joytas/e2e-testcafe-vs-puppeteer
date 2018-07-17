import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

//go to home page
fixture`e2e`.page`http://www.bbc.com`;

//navigate to 'weather' tab
test('bbc weather test', async t => {
    const getLocation = ClientFunction(() => document.location.href);
    const locationsList = Selector('li.ls-c-locations-list-item');
    const getTitle = ClientFunction(() => document.title);

    //navigate to 'weather' tab
    await t
        .takeScreenshot('01-bbc.png')
        .click(Selector('.orb-nav-weather', {timeout: 30000}))
        .takeScreenshot('/02-weather-tab.png')
        .expect(getLocation()).contains('weather')

        //search for location
        .typeText('input#ls-c-search__input-label', 'EC4A')
        .expect(locationsList.exists).ok()
        .takeScreenshot('/03-locations.png')
        .expect(locationsList.count).eql(1)

        //navigate to location
        .click(locationsList)
        .expect(Selector('#wr-forecast').exists).ok()
        .takeScreenshot('/04-ec4a.png')
        .expect(getLocation()).contains('ec4a')
        .expect(getTitle()).contains('EC4A')
});