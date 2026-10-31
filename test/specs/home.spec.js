import { browser, expect } from '@wdio/globals';
import { KEYSTROKE } from '../pageobjects/page.js';
import HomePage from '../pageobjects/home.page.js';
import HomeData from '../data/home.data.json' with { type: 'json' };
import FSRPage from '../pageobjects/flight-search-result.page.js';
import FSRData from '../data/flight-search-result.data.json' with { type: 'json' };
import allureReporter from '@wdio/allure-reporter'

describe('Cheapflights Home Page', () => {
    beforeEach(async () => {
        await HomePage.open(HomeData.home);
    });

    it('Verify home page initial display ', async () => {
        await allureReporter.addStory('Develop tests for validation the logo and login button is displayed');
        const cfLogo = await HomePage.cfLogo;
        await cfLogo.waitForDisplayed();
        await expect(cfLogo).toBeDisplayed({ message: `Failed to display the Cheapflights logo in the home page.` });
        const loginBtn = await HomePage.loginBtn;
        const loginIcon = await HomePage.loginIcon;
        await loginBtn.waitForDisplayed();
        await loginIcon.waitForDisplayed();
        await expect(loginBtn).toBeDisplayed({ message: `Failed to display the white circle in the login button.` });
        await expect(loginIcon).toBeDisplayed({ message: `Failed to display the user icon in the login button.` });
        const tripTypeDropdown = await HomePage.tripTypeDropdown;
        const flightOriginInput = await HomePage.flightOriginInput;
        const flightOriginXBtn = await HomePage.flightOriginXBtn;
        const flightDestInput = await HomePage.flightDestInput;
        const flightDestXBtn = await HomePage.flightDestXBtn;
        const calendarBtn = await HomePage.calendarBtn;
        const travellerCabinBtn = await HomePage.travellerCabinBtn;
        const searchBtn = await HomePage.searchBtn;
        const compareChkbox = await HomePage.compareChkbox;
        const directFlightsOnlyChkbox = await HomePage.directFlightsOnlyChkbox;
        await tripTypeDropdown.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight trip type dropdown to display.` });
        await expect(tripTypeDropdown).toBeDisplayed({ message: `Failed to display the flight trip type dropdown.` });
        await flightOriginInput.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight origin input field to display.` });
        await expect(flightOriginInput).toBeDisplayed({ message: `Failed to display the flight origin input field.` });
        await flightDestInput.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight destination input field to display.` })
        await expect(flightDestInput).toBeDisplayed({ message: `Failed to display the flight destination input field.` });
        await calendarBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the date range button to display.` });
        await expect(calendarBtn).toBeDisplayed({ message: `Failed to display the date range button.` });
        await travellerCabinBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the traveller count and cabin class selection button to display.` });
        await expect(travellerCabinBtn).toBeDisplayed({ message: `Failed to display the traveller count and cabin class selection button.` });
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the Search button to display.` });
        await expect(searchBtn).toBeDisplayed({ message: `Failed to display the Search button.` });
        await flightOriginXBtn.waitForDisplayed({ timeoutMsg: "Failed to wait for the flight origin item to display." });
        await expect(flightOriginXBtn).toBeDisplayed({ message: "Failed to display the flight origin item." });
        await flightDestXBtn.waitForDisplayed({ reverse: true, timeoutMsg: "Failed to " });
        await expect(flightDestXBtn).not.toBeDisplayed();
        await compareChkbox.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the compare checkbox to be hidden.` });
        await expect(compareChkbox).not.toBeDisplayed({ message: `Failed to hide the compare checkbox.` });
        await directFlightsOnlyChkbox.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the direct flights only checkbox to display.` });
        await expect(directFlightsOnlyChkbox).not.toBeDisplayed({ message: `Failed to display the direct flights only checkbox.` });
    });

    it('Verify required details for flight trip type Return - without origin', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        //set Return
        await HomePage.selectTripType(HomeData.flightType.return);
        //remove origin
        const flightOriginXBtn = await HomePage.flightOriginXBtn;
        await flightOriginXBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight origin to display.` });
        await flightOriginXBtn.click();
        await flightOriginXBtn.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the flight origin to disappear.` });
        //set destination
        await HomePage.selectDestination(HomeData.airport.hnd.code);
        //set dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        await HomePage.setTripDuration(today, tomorrow);
        //check travcabpopup
        const travCabPopup = await HomePage.travCabPopup;
        await travCabPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the travellers and cabin class popup to display automatically after selecting the start and end date.` });
        await expect(travCabPopup).toBeDisplayed({ message: `Failed to display the travellers and cabin class popup automatically after selecting the start and end date.` });
        await browser.keys(KEYSTROKE.ESC);
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        const flightOriginInput = await HomePage.flightOriginInput;
        await expect(await flightOriginInput.isFocused()).toEqual(true);
    });

    it('Verify required details for flight trip type Return - without destination', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        //set Return
        await HomePage.selectTripType(HomeData.flightType.return);
        //set origin
        await HomePage.selectOrigin(HomeData.airport.naia.code);
        //set dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        await HomePage.setTripDuration(today, tomorrow);
        //check travcabpopup
        const travCabPopup = await HomePage.travCabPopup;
        await travCabPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the travellers and cabin class popup to display automatically after selecting the start and end date.` });
        await browser.keys(KEYSTROKE.ESC);
        await travCabPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the travellers and cabin class popup to display automatically after selecting the start and end date.` });
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        const destinationPopup = await HomePage.destinationPopup;
        await destinationPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the destination popup to display.` });
        await expect(destinationPopup).toBeDisplayed({ message: `Failed to display the destination popup.` });
        const alertMsg = await HomePage.alertMsg;
        await alertMsg[0].waitForDisplayed({ timeoutMsg: `Failed to wait for the enter destination message to display in the popup.` });
        await expect(alertMsg[0]).toBeDisplayed({ message: `Failed to display the enter destination message in the popup.` })
        await expect(await alertMsg[0].getText()).toEqual(HomeData.errMsg.enterDest);
    });

    it('Verify required details for flight trip type Return - without date', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        //set Return
        await HomePage.selectTripType(HomeData.flightType.return);
        //set origin
        await HomePage.selectOrigin(HomeData.airport.naia.code);
        //set destination
        await HomePage.selectDestination(HomeData.airport.hnd.code);
        //close calendar
        await browser.keys(KEYSTROKE.ESC);
        const calendarPopup = await HomePage.calendarPopup;
        await calendarPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the calendar popup to disappear.` });
        //click search, opens destination popup with 2 alert messages
        const searchBtn = await HomePage.searchBtn;
        await searchBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the search button to display.` });
        await searchBtn.click();
        await calendarPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the calendar popup to display.` });
        const alertMsg = await HomePage.alertMsg;
        await alertMsg[0].waitForDisplayed({ timeoutMsg: `Failed to wait for the enter departure date message to display in the popup.` });
        await expect(alertMsg[0]).toBeDisplayed({ message: `Failed to display the enter departure message in the popup.` })
        await expect(await alertMsg[0].getText()).toEqual(HomeData.errMsg.departureDate);
        await alertMsg[1].waitForDisplayed({ timeoutMsg: `Failed to wait for the enter return date message to display in the popup.` });
        await expect(alertMsg[1]).toBeDisplayed({ message: `Failed to display the enter return message in the popup.` })
        await expect(await alertMsg[1].getText()).toEqual(HomeData.errMsg.returnDate);
    });

    it('Verify required details for flight trip type Return - with complete details and compare checked', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        //set Return
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
        await expect(compareInputChkbox).toBeChecked({ message: `Failed to check the compare checkbox after completing the required trip details.` });
        const compareWithWebsite = await HomePage.compareWithWebsite;
        const siteName = await compareWithWebsite.getText();
        const directFlightsOnlyChkbox = await HomePage.directFlightsOnlyChkbox;
        await directFlightsOnlyChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the direct flights only checkbox to display.` });
        await expect(directFlightsOnlyChkbox).toBeDisplayed({ message: `Failed to display the direct flights only checkbox.` });
        const directFlightsOnlyInputChkbox = await directFlightsOnlyChkbox.$(`input.dX-j-input`);
        await expect(directFlightsOnlyInputChkbox).not.toBeChecked({ message: `Failed to uncheck the direct flights only checkbox.` });
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
        for (const part of parts) {
            await expect(browser).toHaveUrl(expect.stringContaining(part.toLowerCase()));
        }
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl(expect.stringContaining(FSRData.urlSubFolder));
        await expect(browser).toHaveUrl(expect.stringContaining(HomeData.airport.naia.code + "-" + HomeData.airport.hnd.code));
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
    });

    it('Verify required details for flight trip type Return - with complete details and compare unchecked', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        //set Return
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
        const compareInputChkbox = await compareChkbox.$(`input.dX-j-input`);
        await expect(compareInputChkbox).toBeChecked({ message: `Failed to check the compare checkbox after completing the required trip details.` });
        await compareInputChkbox.click();
        await expect(compareInputChkbox).not.toBeChecked({ message: `Failed to uncheck the compare checkbox after completing the required trip details.` });
        const compareWithWebsite = await HomePage.compareWithWebsite;
        const siteName = await compareWithWebsite.getText();
        const directFlightsOnlyChkbox = await HomePage.directFlightsOnlyChkbox;
        await directFlightsOnlyChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the direct flights only checkbox to display.` });
        await expect(directFlightsOnlyChkbox).toBeDisplayed({ message: `Failed to display the direct flights only checkbox.` });
        const directFlightsOnlyInputChkbox = await directFlightsOnlyChkbox.$(`input.dX-j-input`);
        await expect(directFlightsOnlyInputChkbox).not.toBeChecked({ message: `Failed to uncheck the direct flights only checkbox.` });
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
        
    });

    //WIP
    it('Verify required details for flight trip type One-way', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        //set Return
        await HomePage.selectTripType(HomeData.flightType.oneWay);
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
        const compareInputChkbox = await compareChkbox.$(`input.dX-j-input`);
        await compareInputChkbox.click();
        await expect(compareInputChkbox).not.toBeChecked({ message: `Failed to uncheck the compare checkbox after completing the required trip details.` });
        const compareWithWebsite = await HomePage.compareWithWebsite;
        const siteName = await compareWithWebsite.getText();
        const directFlightsOnlyChkbox = await HomePage.directFlightsOnlyChkbox;
        await directFlightsOnlyChkbox.waitForDisplayed({ timeoutMsg: `Failed to wait for the direct flights only checkbox to display.` });
        await expect(directFlightsOnlyChkbox).toBeDisplayed({ message: `Failed to display the direct flights only checkbox.` });
        const directFlightsOnlyInputChkbox = await directFlightsOnlyChkbox.$(`input.dX-j-input`);
        await expect(directFlightsOnlyInputChkbox).not.toBeChecked({ message: `Failed to uncheck the direct flights only checkbox.` });
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
    });

    xit('Verify required details for flight trip type Multi-city', async () => {
        await allureReporter.addStory('Develop tests for searching flights');
        
    });
});