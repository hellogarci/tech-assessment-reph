import { $ } from '@wdio/globals'
import Page from './page.js';

class HomePage extends Page {
    /**
     * Getters
     */ 

    //Logos
    get cfLogo () { return $(`span.gPDR-logo-image`); } //Cheapflights logo
    get loginBtn () { return $(`div.common-layout-react-HeaderAccountWrapper`); } //white circle
    get loginIcon () { return $(`span.J-sA-icon`); } //user icon

    //Flight search bar
    get tripTypeDropdown () { return $(`div[aria-controls='flight-trip-type-dropdown']`); }
    async flightTripType(type) { 
        return $(`ul#flight-trip-type-dropdown > li[aria-label='${type}']`); 
    }
    get searchBtn () { return $(`div[aria-label='Search']`); }
    get compareChkbox () { return $(`//div[text()='Compare vs Cheapflights']/../..//span/span`); }
    get compareWithWebsite () { return $(`div.tP7Y-cmp2 label.dX-j-label`); }
    get directFlightsOnlyChkbox () { return $(`//span[text()='Direct flights only']/../..`); }
    get alertMsg () { return $$(`span.pqPp-title`); }

    //Origin (flight search bar)
    get flightOriginInput () { return $(`div[aria-label='Flight origin input'] input[role='combobox']`); }
    get flightOriginItem () { return $(`div[aria-label='Flight origin input'] div.DAZT-item-value`); }
    get flightOriginXBtn () { return $(`div[aria-label='Flight origin input'] div.DAZT-item-close`); }
    get originPopup () { return $(`ul#flight-origin-smarty-input-list`); }
    async originLocFromPopup(loc) { 
        return $(`//ul[@id='flight-origin-smarty-input-list']/li[contains(@id,'${loc}')]`);
    }

    //Destination (flight search bar)
    get flightDestInput () { return $(`div[aria-label='Flight destination input'] input[role='combobox']`); }
    get flightDestXBtn () { return $(`div[aria-label='Flight destination input'] div.DAZT-item-close`); }
    get destinationPopup () { return $(`div[class='c2u5p c2u5p-mod-spacing-base']`); }
    
    async DestLocFromPopup(loc) { 
        return $(`//span[@class='vPgG-airport-code'][text()='${loc}']`);
    }

    //Calendar (flight search bar)
    get calendarBtn () { return $(`div[role='button'][class='BdbJ-pill BdbJ-mod-divider']`); }
    get calendarPopup () { return $(`div.sGVi-dropdown-content`); }
    get enterDepartureMsg () { return $(``); }
    get enterReturnMsg () { return $(``); }
    async specificDateBtn(date) {
        return $(`//div[contains(@aria-label,'${date}')]/..`);
    }

    //Travellers & Cabin Class selector (flight search bar)
    get travellerCabinBtn () { return $(`//div[@aria-label='Trip type']/..`); }
    get travCabPopup () { return $(`div[class='Gagx-content'] span[class='AFFP AFFP-body AFFP-m AFFP-res']`); }

    
    //**********************************************/

    /**
     * Methods
     */ 

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open (path) {
        return browser.url(path);
    }
    
    /**
     * Selects the flight trip type from the dropdown list
     * @param {String} type Flight trip type
     * @returns 
     */
    async selectTripType(type) {
        const tripTypeDropdown = await this.tripTypeDropdown;
        await tripTypeDropdown.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight trip type dropdown to display.` });
        await tripTypeDropdown.click();
        const tripTypeItem = await this.flightTripType(type);
        await tripTypeItem.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight trip type items to display after clicking the dropdown.` });
        await tripTypeItem.click();
    }

    /**
     * Select the airport origin
     * @param {String} loc any unique identifier of the airport location (code, city name, airport name, etc.)
     */
    async selectOrigin(loc) {
        const flightOriginXBtn = await this.flightOriginXBtn;
        const isDisplayedXBtn = await flightOriginXBtn.isDisplayed();
        if (isDisplayedXBtn) {
            await flightOriginXBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight origin to display.` });
            await flightOriginXBtn.click();
            await flightOriginXBtn.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the flight origin to disappear.` });
        }
        const flightOriginInput = await this.flightOriginInput;
        await flightOriginInput.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight origin input field to display.` });
        await flightOriginInput.setValue(loc);
        const originPopup = await this.originPopup;
        await originPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the origin popup to display.` });
        const originLocFromPopup = await this.originLocFromPopup(loc);
        await originLocFromPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the searched origin to show on the list.` });
        await originLocFromPopup.click();
    }

    /**
     * Select the airport destination
     * @param {String} loc any unique identifier of the airport location
     */
    async selectDestination(loc) {
        const flightDestInput = await this.flightDestInput;
        await flightDestInput.waitForDisplayed({ timeoutMsg: `Failed to wait for the flight origin input field to display.` });
        await flightDestInput.click();
        const destinationPopup = await this.destinationPopup;
        await destinationPopup.waitForDisplayed();
        await flightDestInput.setValue(loc);
        const DestLocFromPopup = await this.DestLocFromPopup(loc);
        await DestLocFromPopup.waitForDisplayed({ timeoutMsg: `Failed to wait for the searched origin to show on the list.` });
        await DestLocFromPopup.click();
    }

    /**
     * Set the Departure and Return date in the calendar
     * @param {*} sDate start/departure date
     * @param {*} eDate end/return date
     */
    async setTripDuration(sDate, eDate) {
        const firstDate = await this.formatDate(sDate);
        const secondDate = await this.formatDate(eDate);
        const calendarPopup = await this.calendarPopup;
        let isCalendarPopupDisplayed = await calendarPopup.isDisplayed();
        if (!isCalendarPopupDisplayed) {
            const calendarBtn = await this.calendarBtn;
            await calendarBtn.waitForDisplayed({ timeoutMsg: `Failed to wait for the calendar button to display.` });
            await calendarBtn.click();
        }
        const startDate = await this.specificDateBtn(firstDate);
        const endDate = await this.specificDateBtn(secondDate);
        await startDate.waitForDisplayed({ timeoutMsg: `Failed to wait for the start date to display.` });
        await startDate.click();
        await endDate.waitForDisplayed({ timeoutMsg: `Failed to wait for the end date to display.` });
        await endDate.click();
        await calendarPopup.waitForDisplayed({ reverse: true, timeoutMsg: `Failed to wait for the calendar to be hidden after selecting the start and end date.` });
    }
}

export default new HomePage();