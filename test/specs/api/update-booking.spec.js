import apiData from '../../data/api/api.data.json' with { type: 'json' };
import ApiMethods from '../../pageobjects/api/api.helper.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const assert = require('assert');

describe('API Automation: UpdateBooking', () => {
    it('Update a booking with complete and correct details', async () => {
        const tokenResp = await browser.call(async () => await ApiMethods.createToken());
        const bookingDetails = {
            "firstname": apiData.ub[0].firstname,
            "lastname": apiData.ub[0].lastname,
            "totalprice": apiData.ub[0].totalprice,
            "depositpaid": apiData.ub[0].depositpaid,
            "bookingdates": {
                "checkin": apiData.ub[0].checkin,
                "checkout": apiData.ub[0].checkout
            },
            "additionalneeds": apiData.ub[0].additionalneeds
        }
        //create booking
        const createBookingResp = await browser.call(async () => await ApiMethods.createBooking(bookingDetails));
        assert.strictEqual(createBookingResp.status, 200);
        console.log(createBookingResp.data);
        console.log("bookingid:::::: " + createBookingResp.data.bookingid);

        //get booking to check if the newly created booking exists and can be searched
        // console.log("bookingid for getbooking api:::::: " + createBookingResp.data.bookingid);
        const getBookingResp = await browser.call(async () => await ApiMethods.getBooking(createBookingResp.data.bookingid));
        assert.strictEqual(getBookingResp.status, 200);
        // console.log(getBookingResp.data);
        assert.strictEqual(getBookingResp.data.firstname, apiData.ub[0].firstname);
        assert.strictEqual(getBookingResp.data.lastname, apiData.ub[0].lastname);
        assert.strictEqual(getBookingResp.data.totalprice, apiData.ub[0].totalprice);
        assert.strictEqual(getBookingResp.data.depositpaid, apiData.ub[0].depositpaid);
        assert.strictEqual(getBookingResp.data.bookingdates.checkin, apiData.ub[0].checkin);
        assert.strictEqual(getBookingResp.data.bookingdates.checkout, apiData.ub[0].checkout);
        assert.strictEqual(getBookingResp.data.additionalneeds, apiData.ub[0].additionalneeds);

        const newBookingDetails = {
            "firstname": apiData.ub[1].firstname,
            "lastname": apiData.ub[1].lastname,
            "totalprice": apiData.ub[1].totalprice,
            "depositpaid": apiData.ub[1].depositpaid,
            "bookingdates": {
                "checkin": apiData.ub[1].checkin,
                "checkout": apiData.ub[1].checkout
            },
            "additionalneeds": apiData.ub[1].additionalneeds
        }
        const response = await browser.call(async () => await ApiMethods.updateBooking(tokenResp, createBookingResp.data.bookingid, newBookingDetails));
        assert.strictEqual(response.status, 200);
        console.log(response.data);
        console.log(response.data.bookingid);

        //get booking to check if the newly created booking exists and can be searched
        console.log("bookingid for getbooking api:::::: " + createBookingResp.data.bookingid);
        const getUpdatedBookingResp = await browser.call(async () => await ApiMethods.getBooking(createBookingResp.data.bookingid));
        assert.strictEqual(getUpdatedBookingResp.status, 200);
        console.log(getUpdatedBookingResp.data);
        assert.strictEqual(getUpdatedBookingResp.data.firstname, apiData.ub[1].firstname);
        assert.strictEqual(getUpdatedBookingResp.data.lastname, apiData.ub[1].lastname);
        assert.strictEqual(getUpdatedBookingResp.data.totalprice, apiData.ub[1].totalprice);
        assert.strictEqual(getUpdatedBookingResp.data.depositpaid, apiData.ub[1].depositpaid);
        assert.strictEqual(getUpdatedBookingResp.data.bookingdates.checkin, apiData.ub[1].checkin);
        assert.strictEqual(getUpdatedBookingResp.data.bookingdates.checkout, apiData.ub[1].checkout);
        assert.strictEqual(getUpdatedBookingResp.data.additionalneeds, apiData.ub[1].additionalneeds);

        //request delete here
        const delBookingResp = await browser.call(async () => await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid));
        assert.strictEqual(delBookingResp.status, 201);
        //check if deleted
        const confirmDelResp = await browser.call(async () => await ApiMethods.getBooking(createBookingResp.data.bookingid));
        assert.strictEqual(confirmDelResp.status, 404);
    });
});