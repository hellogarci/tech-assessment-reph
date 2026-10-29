import { $ } from '@wdio/globals'
import Page from './page.js';

class HomePage extends Page {
    //Getters
    get cfLogo () { return $(`span.gPDR-logo-image`); } //Cheapflights logo
    get loginBtn () { return $(`div.common-layout-react-HeaderAccountWrapper`); } //white circle
    get loginIcon () { return $(`span.J-sA-icon`); } //user icon

    //**********************************************/

    //Methods

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(path);
    }
}

export default new HomePage();