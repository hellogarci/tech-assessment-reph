import apiData from '../../data/api/api.data.json' with { type: 'json' };
import ApiMethods from '../../pageobjects/api/api.helper.js';
import { expect } from 'chai';
import addContext from 'mochawesome/addContext.js';
const tokenResp = await ApiMethods.createToken();

describe('API Automation: DeleteBooking', async function () {
    it('Verify DeleteBooking with bookingid that exist (1) and does not exist (2)', async function () {
        //create booking
        const createBookingResp = await ApiMethods.createBooking(apiData.complete);
        expect(createBookingResp.status).to.equal(200);
        addContext(this, { title: "CreateBooking API response code: ", value: createBookingResp.status });
        addContext(this, { title: "CreateBooking API response body: ", value: createBookingResp.data });

        //get booking to check if the newly created booking exists and can be searched
        const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(getBookingResp.status).to.equal(200);

        //delete the newly created booking
        const delBooking1stResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
        expect(delBooking1stResp.status).to.equal(201);
        addContext(this, { title: "(First request) DeleteBooking API response code", value: delBooking1stResp.status });
        addContext(this, { title: "(First request) DeleteBooking API response body", value: delBooking1stResp.data });
        
        //get bookingid that does not exist anymore
        const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(confirmDelResp.status).to.equal(404);
        addContext(this, { title: "GetBooking API response code", value: confirmDelResp.status });
        addContext(this, { title: "GetBooking API response body", value: confirmDelResp.data });

        //delete the already deleted bookingid
        const delBooking2ndResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
        expect(delBooking2ndResp.status).to.equal(405);
        addContext(this, { title: "(Second request, same bookingid) DeleteBooking API response code", value: delBooking2ndResp.status });
        addContext(this, { title: "(Second request, same bookingid) DeleteBooking API response body", value: delBooking2ndResp.data });
    });

    it('Verify DeleteBooking with missing bookingid', async function () {
        //create booking
        const createBookingResp = await ApiMethods.createBooking(apiData.complete);
        expect(createBookingResp.status).to.equal(200);
        addContext(this, { title: "CreateBooking API response code: ", value: createBookingResp.status });
        addContext(this, { title: "CreateBooking API response body: ", value: createBookingResp.data });

        //delete the newly created booking
        const delBookingBlankResp = await ApiMethods.deleteBooking(tokenResp, apiData.blank);
        addContext(this, "DeleteBooking Url Parameter value: ''.");
        expect(delBookingBlankResp.status).to.equal(405);
        addContext(this, { title: "DeleteBooking API response code", value: delBookingBlankResp.status });
        addContext(this, { title: "DeleteBooking API response body", value: delBookingBlankResp.data });

        //get booking to check if the newly created booking exists and can be searched
        const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(getBookingResp.status).to.equal(200);
        
        //delete the newly created booking
        const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
        expect(delBookingResp.status).to.equal(201);
        addContext(this, { title: "(First request) DeleteBooking API response code", value: delBookingResp.status });
        addContext(this, { title: "(First request) DeleteBooking API response body", value: delBookingResp.data });
    });
});