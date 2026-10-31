import { $ } from '@wdio/globals'
import Page from './page.js';

class FlightSearchResultPage extends Page {

    /**
     * Getters
     */

    get searchResultList () { return $(`div.ev1_-results-list`); }
    get resultItems () { return $$(`//div[contains(@aria-label,'Result item')]`); }
    get flightStopType () { return $(`div.JWEO`); }
    
    //**********************************************/

    /**
     * Methods
     */
}

export default new FlightSearchResultPage();