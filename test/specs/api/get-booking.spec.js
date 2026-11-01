import apiData from '../../data/api/api.data.json' with { type: 'json' };
import ApiMethods from '../../pageobjects/api/api.helper.js';
import { expect } from 'chai';
import addContext from 'mochawesome/addContext.js';
const tokenResp = await ApiMethods.createToken();

describe('API Automation: GetBooking', async function () {

    it('Verify GetBooking with bookingid that exist (1) and does not exist (2)', async function () {
        //create booking
        const createBookingResp = await ApiMethods.createBooking(apiData.complete);
        expect(createBookingResp.status).to.equal(200);
        addContext(this, { title: "CreateBooking API response code: ", value: createBookingResp.status });
        addContext(this, { title: "CreateBooking API response body: ", value: createBookingResp.data });

        //get booking to check if the newly created booking exists and can be searched
        const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(getBookingResp.status).to.equal(200);
        addContext(this, { title: "(Before bookingid Delete) GetBooking API response code", value: getBookingResp.status });
        addContext(this, { title: "(Before bookingid Delete) GetBooking API response body", value: getBookingResp.data });

        //delete the newly created booking
        const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
        expect(delBookingResp.status).to.equal(201);
        
        //get bookingid that does not exist anymore
        const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(confirmDelResp.status).to.equal(404);
        addContext(this, { title: "(After bookingid Delete) GetBooking API response code", value: confirmDelResp.status });
        addContext(this, { title: "(After bookingid Delete) GetBooking API response body", value: confirmDelResp.data });
    });

    it('Verify GetBooking with missing bookingid', async function () {
        //create booking
        const createBookingResp = await ApiMethods.createBooking(apiData.complete);
        expect(createBookingResp.status).to.equal(200);
        addContext(this, { title: "CreateBooking API response code: ", value: createBookingResp.status });
        addContext(this, { title: "CreateBooking API response body: ", value: createBookingResp.data });

        //get booking to check if the newly created booking exists and can be searched
        const getBookingResp = await ApiMethods.getBooking(apiData.blank);
        addContext(this, "GetBooking Url Parameter value: ''.");
        addContext(this, { title: "GetBooking API response code", value: getBookingResp.status });
        addContext(this, { title: "GetBooking API response body", value: getBookingResp.data });
        expect(getBookingResp.status).to.equal(404);

        //delete the newly created booking
        const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
        expect(delBookingResp.status).to.equal(201);
        
        //get bookingid that does not exist anymore
        const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(confirmDelResp.status).to.equal(404);
    });
});