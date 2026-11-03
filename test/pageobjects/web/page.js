import { browser } from '@wdio/globals'

export const KEYSTROKE = Object.freeze({
    ESC: '\uE00C'
});

export const WAIT = Object.freeze({
    SHORT: '5000',
    MED: '10000',
    LONG: '60000'
});

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open () {
        return browser.url('/');
    }

    async formatDateWDMY(unformattedDate) {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(unformattedDate);
        const finalFormattedDate = formattedDate.replace(/\s(\d{4})$/, ', $1');
        return finalFormattedDate;
    }

    async formatDateWDM(unformattedDate) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = daysOfWeek[unformattedDate.getDay()];
        const day = unformattedDate.getDate();
        const month = unformattedDate.getMonth()+1;
        const formattedDate = `${dayName} ${day}/${month}`;
        return formattedDate;
    }

    async formatDateWDMtripcom (unformattedDate) {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(unformattedDate);
        return formattedDate;
    }
}
