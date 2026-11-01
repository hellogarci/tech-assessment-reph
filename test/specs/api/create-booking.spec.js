import apiData from '../../data/api/api.data.json' with { type: 'json' };
import ApiMethods from '../../pageobjects/api/api.helper.js';
import { expect } from 'chai';
import addContext from 'mochawesome/addContext.js';
const tokenResp = await ApiMethods.createToken();

describe('API Automation: CreateBooking', async function () {

    it('Create a booking with complete and correct details', async function () {
        //create booking
        const createBookingResp = await ApiMethods.createBooking(apiData.complete);
        expect(createBookingResp.status).to.equal(200);
        addContext(this, { title: "CreateBooking API response code", value: createBookingResp.status });

        //get booking to check if the newly created booking exists and can be searched
        const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(getBookingResp.status).to.equal(200);
        expect(getBookingResp.data.firstname).to.equal(apiData.complete.firstname);
        expect(getBookingResp.data.lastname).to.equal(apiData.complete.lastname);
        expect(getBookingResp.data.totalprice).to.equal(apiData.complete.totalprice);
        expect(getBookingResp.data.depositpaid).to.equal(apiData.complete.depositpaid);
        expect(getBookingResp.data.bookingdates.checkin).to.equal(apiData.complete.bookingdates.checkin);
        expect(getBookingResp.data.bookingdates.checkout).to.equal(apiData.complete.bookingdates.checkout);
        expect(getBookingResp.data.additionalneeds).to.equal(apiData.complete.additionalneeds);
        addContext(this, { title: "GetBooking API response code", value: getBookingResp.status });
        addContext(this, { title: "GetBooking API response body", value: getBookingResp.data });

        //request delete here
        const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
        expect(delBookingResp.status).to.equal(201);
        //check if deleted
        const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
        expect(confirmDelResp.status).to.equal(404);
    });

    it('Create a booking with empty request body', async function () {
        const bookingDetails = {};
        //create booking
        const createBookingResp = await ApiMethods.createBooking(bookingDetails);
        expect(createBookingResp.status).to.equal(500); //Internal Server Error
        addContext(this, { title: "CreateBooking API response code", value: createBookingResp.status });
    });

    for (const dataset of apiData.cb) {
        it('Create a booking: '+dataset.desc, async function () {
            //create booking
            const createBookingResp = await ApiMethods.createBooking(dataset.data);
            expect(createBookingResp.status).to.equal(dataset.expectedStatus);
            addContext(this, { title: "CreateBooking API response code: ", value: createBookingResp.status });
            addContext(this, { title: "CreateBooking API response body: ", value: createBookingResp.data });

            if (dataset.expectedStatus == 200) {
                //get booking to check if the newly created booking exists and can be searched
                const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
                expect(getBookingResp.status).to.equal(200);
                expect(getBookingResp.data.firstname).to.equal(dataset.data.firstname);
                expect(getBookingResp.data.lastname).to.equal(dataset.data.lastname);
                expect(getBookingResp.data.totalprice).to.equal(dataset.data.totalprice);
                expect(getBookingResp.data.depositpaid).to.equal(dataset.data.depositpaid);
                expect(getBookingResp.data.bookingdates.checkin).to.equal(dataset.data.bookingdates.checkin);
                expect(getBookingResp.data.bookingdates.checkout).to.equal(dataset.data.bookingdates.checkout);
                expect(getBookingResp.data.additionalneeds).to.equal(dataset.data.additionalneeds);
                addContext(this, { title: "GetBooking API response code: ", value: getBookingResp.status  });
                addContext(this, { title: "GetBooking API response body: ", value: getBookingResp.data  });

                //Cleanup
                //request delete here
                const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
                expect(delBookingResp.status).to.equal(201);
                //check if deleted
                const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
                expect(confirmDelResp.status).to.equal(404);
            }
        });
    }

});