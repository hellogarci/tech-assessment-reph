import { $ } from '@wdio/globals'
import Page from './page.js';

class FlightSearchResultPage extends Page {

    /**
     * Getters
     */

    get searchResultList () { return $(`div.ev1_-results-list`); }
    get resultItems () { return $$(`//div[contains(@aria-label,'Result item')]`); }
    get flightStopTypes () { return $$(`div.JWEO > div.vmXl-mod-variant-default > span`); }
    get airportDetails () { return $$(`//div[contains(@class,'c_cgF-mod-variant-full-airport-wide')]/../..`); }
    get cabinClassDetails () { return $$(`//div[contains(@aria-label,'Result item')]//span[contains(@title,'Economy')]`) }
    async departureDate (sDate) { return $$(`div[aria-label='Departure date ${sDate}']`)[1]; }
    async returnDate (eDate) { return $$(`div[aria-label='Return date ${eDate}']`)[1]; }
    get tripcomOriginAirport () { return $(`//div[contains(@aria-label,'Departure airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'airport-name')]`); }
    get tripcomOriginCity () { return $(`//div[contains(@aria-label,'Departure airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'city-name')]`); }
    get tripcomDestinationAirport () { return $(`//div[contains(@aria-label,'Arrival airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'airport-name')]`); }
    get tripcomDestinationCity () { return $(`//div[contains(@aria-label,'Arrival airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'city-name')]`); }
    get palOriginAirport () { return $(``); }
    get palOriginCity () { return $(``); }
    get palDestinationAirport () { return $(``); }
    get palDestinationCity () { return $(``); }

    //**********************************************/

    /**
     * Methods
     */
}

export default new FlightSearchResultPage();