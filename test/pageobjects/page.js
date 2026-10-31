import { browser } from '@wdio/globals'

export const KEYSTROKE = Object.freeze({
    ESC: '\uE00C'
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

    async formatDate(unformattedDate) {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(unformattedDate);
        const finalFormattedDate = formattedDate.replace(/\s(\d{4})$/, ', $1');
        return finalFormattedDate;
    }
}
