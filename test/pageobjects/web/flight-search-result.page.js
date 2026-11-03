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
    get tripcomLoading () { return $(`div.usp-loading-content`); }
    get tripcomLogo () { return $(`div.mc-hd__logo-con`); }
    get tripcomOriginAirportA () { return $(`//div[contains(@aria-label,'Departure airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'airport-name')]`); }
    get tripcomOriginAirportB () { return $(`//div[contains(@aria-label,'Departure airport or city')]//span[contains(@class,'city-name')]/span[contains(@class,'airport-name')]`); }
    get tripcomOriginCityA () { return $(`//div[contains(@aria-label,'Departure airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'city-name')]`); }
    get tripcomOriginCityB () { return $(`//div[contains(@aria-label,'Departure airport or city')]//span[contains(@class,'city-name')]/span[not(contains(@class,'airport-name'))]`); }
    get tripcomDestinationAirportA () { return $(`//div[contains(@aria-label,'Arrival airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'airport-name')]`); }
    get tripcomDestinationAirportB () { return $(`//div[contains(@aria-label,'Arrival airport or city')]//span[contains(@class,'city-name')]/span[contains(@class,'airport-name')]`); }
    get tripcomDestinationCityA () { return $(`//div[contains(@aria-label,'Arrival airport or city')]//div[contains(@class,'city-name')]/span[contains(@class,'city-name')]`); }
    get tripcomDestinationCityB () { return $(`//div[contains(@aria-label,'Arrival airport or city')]//span[contains(@class,'city-name')]/span[not(contains(@class,'airport-name'))]`); }
    get tripcomDepartureDate () { return $(`input[data-testid='search_date_depart0']`); }
    get tripcomReturnDate () { return $(`input[data-testid='search_date_return0']`); }
    get tripcomStopType () { return $(`span[data-testid='direct-button-text']`); }
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