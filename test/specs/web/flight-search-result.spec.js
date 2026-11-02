import { browser, expect } from '@wdio/globals';
import { KEYSTROKE, WAIT } from '../../pageobjects/web/page.js';
import HomePage from '../../pageobjects/web/home.page.js';
import HomeData from '../../data/web/home.data.json' with { type: 'json' };
import FSRPage from '../../pageobjects/web/flight-search-result.page.js';
import FSRData from '../../data/web/flight-search-result.data.json' with { type: 'json' };
import allureReporter from '@wdio/allure-reporter'


describe('Cheapflights Search Result Page', () => {
    beforeEach(async () => {
        await HomePage.open(HomeData.home);
    });

    it('Verify if the details in the search bar matched the flight search results', async () => {
        await allureReporter.addStory('Develop assertions for flight search results');
        //set trip type
        await HomePage.selectTripType(HomeData.flightType.return);
        //set origin
        await HomePage.selectOrigin(HomeData.airport.naia.code);
        //set destination
        await HomePage.selectDestination(HomeData.airport.hnd.code);
        //set dates
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        await HomePage.setTripDuration(today, tomorrow);
        //close travcabpopup and checkboxes are displayed and enabled
        const travCabPopup = await HomePage.travCabPopup;
        await browser.keys(KEYSTROKE.ESC);
        await travCabPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the travellers and cabin class popup to be hidden.` });
        const compareChkbox = await HomePage.compareChkbox;
        await compareChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the compare checkbox to display.` });
        const compareInputChkbox = await compareChkbox.$(`input.dX-j-input`);
        const isCompareTicked = await compareInputChkbox.isSelected();
        if (isCompareTicked) await compareInputChkbox.click();
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        //check search result
        const searchResultList = await FSRPage.searchResultList;
        await searchResultList.waitForDisplayed({ timeout: WAIT.MED, timeoutMsg: `Failed to wait for the search result list to display.` });
        await expect(searchResultList).toBeDisplayed({ message: `Failed to display the search result list.` });
        const resultItems = await FSRPage.resultItems;
        await resultItems[0].waitForDisplayed({ timeout: WAIT.MED, timeoutMsg: `Failed to wait for the result items to display.` });
        const airportDetails = await FSRPage.airportDetails;
        await airportDetails[(await airportDetails.length)-1].waitForDisplayed({ timeoutMsg: `Failed to wait for the last flight stop to display.` });
        let ctr = 1;
        for (const airportDetail of airportDetails) {
            await airportDetail.scrollIntoView();
            await airportDetail.waitForDisplayed({ timeoutMsg: `Failed to wait for the airport details (${ctr}) to display.` });
            await expect(airportDetail).toHaveText(expect.stringContaining(HomeData.airport.naia.code));
            await expect(airportDetail).toHaveText(expect.stringContaining(HomeData.airport.naia.name));
            await expect(airportDetail).toHaveText(expect.stringContaining(HomeData.airport.hnd.code));
            await expect(airportDetail).toHaveText(expect.stringContaining(HomeData.airport.hnd.name));
            ctr++;
            if (ctr >= 10)
                break;
        }
        const cabinClassDetails = await FSRPage.cabinClassDetails;
        await cabinClassDetails[(await cabinClassDetails.length)-1].waitForDisplayed({ timeoutMsg: `Failed to wait for the last flight stop to display.` });
        ctr = 1;
        for (const cabinClassDetail of cabinClassDetails) {
            await cabinClassDetail.scrollIntoView();
            await cabinClassDetail.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight stop type (${ctr}) to display.` });
            await expect(cabinClassDetail).toHaveText(expect.stringContaining(HomeData.cabinClass.eco));
            ctr++;
            if (ctr >= 10)
                break;
        }
        const dDate = await FSRPage.formatDateDM(today);
        const departureDate = await FSRPage.departureDate(dDate);
        await departureDate.waitForDisplayed({ timeout: `Failed to wait for the selected departure date to display.` });
        await expect(departureDate).toBeDisplayed({ message: `Failed to display the selected departure date.` });
        
        const rDate = await FSRPage.formatDateDM(tomorrow);
        const returnDate = await FSRPage.returnDate(rDate);
        await returnDate.waitForDisplayed({ timeout: `Failed to wait for the selected return date to display.` });
        await expect(returnDate).toBeDisplayed({ message: `Failed to display the selected return date.` });
    });

    it('Verify flight search results when Direct flight only is unchecked', async () => {
        await allureReporter.addStory('Develop assertions for flight search results');
        //set trip type
        await HomePage.selectTripType(HomeData.flightType.return);
        //set origin
        await HomePage.selectOrigin(HomeData.airport.naia.code);
        //set destination
        await HomePage.selectDestination(HomeData.airport.hnd.code);
        //set dates
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        await HomePage.setTripDuration(today, tomorrow);
        //close travcabpopup and checkboxes are displayed and enabled
        const travCabPopup = await HomePage.travCabPopup;
        await browser.keys(KEYSTROKE.ESC);
        await travCabPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the travellers and cabin class popup to be hidden.` });
        const compareChkbox = await HomePage.compareChkbox;
        await compareChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the compare checkbox to display.` });
        const compareInputChkbox = await compareChkbox.$(`input.dX-j-input`);
        const isCompareTicked = await compareInputChkbox.isSelected();
        if (isCompareTicked) await compareInputChkbox.click();
        const directFlightsOnlyChkbox = await HomePage.directFlightsOnlyChkbox;
        await directFlightsOnlyChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the direct flights only checkbox to display.` });
        const directFlightsOnlyInputChkbox = await directFlightsOnlyChkbox.$(`input.dX-j-input`);
        await expect(directFlightsOnlyInputChkbox).not.toBeChecked({ message: `Failed to uncheck the direct flights only checkbox.` });
        //click search, new tab will open and the old tab will be redirected to a new flight checker website (as indicated in the compare checkbox label)
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        await expect(browser).toHaveUrl(expect.stringContaining(FSRData.urlSubFolder));
        await expect(browser).toHaveUrl(expect.stringContaining(HomeData.airport.naia.code + "-" + HomeData.airport.hnd.code));
        const searchResultList = await FSRPage.searchResultList;
        await searchResultList.waitForDisplayed({ timeout: WAIT.MED, timeoutMsg: `Failed to wait for the search result list to display.` });
        await expect(searchResultList).toBeDisplayed({ message: `Failed to display the search result list.` });
        const flightStopTypes = await FSRPage.flightStopTypes;
        const stopsCount = await flightStopTypes.length; //get the last flight stop on the list and wait for it to load first before verifying.
        await flightStopTypes[stopsCount-1].waitForDisplayed({ timeoutMsg: `Failed to wait for the last flight stop to display.` });
        let ctr = 1;
        for (const flightStopType of flightStopTypes) {
            await flightStopType.scrollIntoView();
            await flightStopType.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight stop type (${ctr}) to display.` });
            await expect(flightStopType).toHaveText(expect.oneOf(FSRData.stops.oneStop, FSRData.stops.direct));
            ctr++;
            if (ctr >= 10)
                break;
        }
    });

    it('Verify flight search results when Direct flight only is checked', async () => {
        await allureReporter.addStory('Develop assertions for flight search results');
        //set trip type
        await HomePage.selectTripType(HomeData.flightType.return);
        //set origin
        await HomePage.selectOrigin(HomeData.airport.naia.code);
        //set destination
        await HomePage.selectDestination(HomeData.airport.hnd.code);
        //set dates
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        await HomePage.setTripDuration(today, tomorrow);
        //close travcabpopup and checkboxes are displayed and enabled
        const travCabPopup = await HomePage.travCabPopup;
        await browser.keys(KEYSTROKE.ESC);
        await travCabPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the travellers and cabin class popup to be hidden.` });
        const compareChkbox = await HomePage.compareChkbox;
        await compareChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the compare checkbox to display.` });
        const compareInputChkbox = await compareChkbox.$(`input.dX-j-input`);
        const isCompareTicked = await compareInputChkbox.isSelected();
        if (isCompareTicked) await compareInputChkbox.click();
        const compareWithWebsite = await HomePage.compareWithWebsite;
        const siteName = await compareWithWebsite.getText();
        const directFlightsOnlyChkbox = await HomePage.directFlightsOnlyChkbox;
        await directFlightsOnlyChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the direct flights only checkbox to display.` });
        await expect(directFlightsOnlyChkbox).toBeDisplayed({ message: `Failed to display the direct flights only checkbox.` });
        const directFlightsOnlyInputChkbox = await directFlightsOnlyChkbox.$(`input.dX-j-input`);
        await directFlightsOnlyInputChkbox.click();
        await expect(directFlightsOnlyInputChkbox).toBeChecked({ message: `Failed to uncheck the direct flights only checkbox.` });
        //click search, new tab will open and the old tab will be redirected to a new flight checker website (as indicated in the compare checkbox label)
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        const handles = await browser.getWindowHandles();
        await expect(browser).toHaveWindowCount(1);
        await browser.switchToWindow(handles[0]);
        const parts = siteName.trim().split(/\s+/);
        for (const part of parts) {
            await expect(browser).not.toHaveUrl(expect.stringContaining(part.toLowerCase()));
        }
        await expect(browser).toHaveUrl(expect.stringContaining(FSRData.urlSubFolder));
        await expect(browser).toHaveUrl(expect.stringContaining(HomeData.airport.naia.code + "-" + HomeData.airport.hnd.code));
        const searchResultList = await FSRPage.searchResultList;
        await searchResultList.waitForDisplayed({ timeout: WAIT.MED, timeoutMsg: `Failed to wait for the search result list to display.` });
        await expect(searchResultList).toBeDisplayed({ message: `Failed to display the search result list.` });
        const resultItems = await FSRPage.resultItems;
        await resultItems[0].waitForDisplayed({ timeout: WAIT.MED, timeoutMsg: `Failed to wait for the result items to display.` });
        const flightStopTypes = await FSRPage.flightStopTypes;
        const stopsCount = await flightStopTypes.length; //get the last flight stop on the list and wait for it to load first before verifying.
        await flightStopTypes[stopsCount-1].waitForDisplayed({ timeout: WAIT.MED, timeoutMsg: `Failed to wait for the last flight stop to display.` });
        let ctr = 1;
        for (const flightStopType of flightStopTypes) {
            await flightStopType.scrollIntoView();
            await flightStopType.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight stop type (${ctr}) to display.` });
            await expect(flightStopType).toHaveText(FSRData.stops.direct);//toBeDisplayed({ message: `Failed to display the flight stop type (${ctr}) after switching the trip type to Multi-city.` });
            ctr++;
            if (ctr >= 10)
                break;
        }
    });

    //WIP
    xit('Verify flight search results when Compare vs Cheapflights is checked', async () => {
        await allureReporter.addStory('Develop assertions for flight search results');
        //set trip type
        await HomePage.selectTripType(HomeData.flightType.return);
        //set origin
        await HomePage.selectOrigin(HomeData.airport.naia.code);
        //set destination
        await HomePage.selectDestination(HomeData.airport.hnd.code);
        //set dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        await HomePage.setTripDuration(today, tomorrow);
        //close travcabpopup and checkboxes are displayed and enabled
        const travCabPopup = await HomePage.travCabPopup;
        await browser.keys(KEYSTROKE.ESC);
        await travCabPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the travellers and cabin class popup to be hidden.` });
        await expect(travCabPopup).not.toBeDisplayed({ message: `Failed to hide the travellers and cabin class popup.` });
        const compareChkbox = await HomePage.compareChkbox;
        await compareChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the compare checkbox to display.` });
        await expect(compareChkbox).toBeDisplayed({ message: `Failed to display the compare checkbox after completing the required trip details.` });
        const compareInputChkbox = await compareChkbox.$(`input.dX-j-input`);
        const isCompareTicked = await compareInputChkbox.isSelected();
        if (!isCompareTicked) await compareInputChkbox.click();
        await expect(compareInputChkbox).toBeChecked({ message: `Failed to check the compare checkbox after completing the required trip details.` });
        const compareWithWebsite = await HomePage.compareWithWebsite;
        const siteName = await compareWithWebsite.getText();
        //click search, new tab will open and the old tab will be redirected to a new flight checker website (as indicated in the compare checkbox label)
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1, {
                timeoutMsg: `New tab was not opened after clicking the search button.`
            }
        );
        const handles = await browser.getWindowHandles();
        await expect(browser).toHaveWindowCount(2);
        await browser.switchToWindow(handles[0]);
        const parts = siteName.trim().split(/\s+/);
        await browser.pause(WAIT.SHORT);
        for (const part of parts) {
            await expect(browser).toHaveUrl(expect.stringContaining(part.toLowerCase()));
        }
        if (siteName == FSRData.compareVS.trip) {
            const tripcomOriginAirport = await FSRPage.tripcomOriginAirport;
            const tripcomOriginAirportTxt = await tripcomOriginAirport.getText();
            await expect(tripcomOriginAirportTxt).toHaveText(expect.stringContaining(HomeData.airport.naia.name));
            const tripcomOriginCity = await FSRPage.tripcomOriginCity;
            const tripcomOriginCityTxt = await tripcomOriginCity.getText();
            await expect(tripcomOriginCityTxt).toHaveText(expect.stringContaining(HomeData.airport.naia.city));
            const tripcomDestinationAirport = await FSRPage.tripcomDestinationAirport;
            const tripcomDestinationAirportTxt = await tripcomDestinationAirport.getText();
            await expect(tripcomDestinationAirportTxt).toHaveText(expect.stringContaining(HomeData.airport.hnd.name));
            const tripcomDestinationCity = await FSRPage.tripcomDestinationCity;
            const tripcomDestinationCityTxt = await tripcomDestinationCity.getText();
            await expect(tripcomDestinationCityTxt).toHaveText(expect.stringContaining(HomeData.airport.hnd.city));
        }
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl(expect.stringContaining(FSRData.urlSubFolder));
        await expect(browser).toHaveUrl(expect.stringContaining(HomeData.airport.naia.code + "-" + HomeData.airport.hnd.code));
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
    });
});