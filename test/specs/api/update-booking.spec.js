import apiData from '../../data/api/api.data.json' with { type: 'json' };
import ApiMethods from '../../pageobjects/api/api.helper.js';
import { expect } from 'chai';
import addContext from 'mochawesome/addContext.js';
const tokenResp = await ApiMethods.createToken();

describe('API Automation: UpdateBooking', async function () {

    for (const dataset of apiData.ub) {
        it('Verify UpdateBooking: '+dataset.desc, async function () {
            //create booking
            const createBookingResp = await ApiMethods.createBooking(dataset.data1);
            expect(createBookingResp.status).to.equal(dataset.expectedStatus1);
            addContext(this, { title: "CreateBooking request body: ", value: dataset.data1 });
            addContext(this, { title: "CreateBooking API response code", value: createBookingResp.status });

            //get booking to check if the newly created booking exists and can be searched
            const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
            expect(getBookingResp.status).to.equal(dataset.expectedStatus1);
            expect(getBookingResp.data.firstname).to.equal(dataset.data1.firstname);
            expect(getBookingResp.data.lastname).to.equal(dataset.data1.lastname);
            expect(getBookingResp.data.totalprice).to.equal(dataset.data1.totalprice);
            expect(getBookingResp.data.depositpaid).to.equal(dataset.data1.depositpaid);
            expect(getBookingResp.data.bookingdates.checkin).to.equal(dataset.data1.bookingdates.checkin);
            expect(getBookingResp.data.bookingdates.checkout).to.equal(dataset.data1.bookingdates.checkout);
            expect(getBookingResp.data.additionalneeds).to.equal(dataset.data1.additionalneeds);
            addContext(this, { title: "GetBooking API response code", value: getBookingResp.status });
            addContext(this, { title: "GetBooking API response body", value: getBookingResp.data });

            const updateBookingResp = await ApiMethods.updateBooking(tokenResp, createBookingResp.data.bookingid, dataset.data2);
            expect(updateBookingResp.status).to.equal(dataset.expectedStatus2);
            addContext(this, { title: "UpdateBooking request body: ", value: dataset.data2 });
            addContext(this, { title: "UpdateBooking API response code", value: updateBookingResp.status });

            if (dataset.expectedStatus2 == 200) {
                //get booking to check if the newly created booking exists and can be searched
                const getUpdatedBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
                addContext(this, { title: "(After Update) GetBooking API response code", value: getUpdatedBookingResp.status });
                addContext(this, { title: "(After Update) GetBooking API response body", value: getUpdatedBookingResp.data });
                expect(getUpdatedBookingResp.status).to.equal(200);
                expect(getUpdatedBookingResp.data.firstname).to.equal(dataset.data2.firstname);
                expect(getUpdatedBookingResp.data.lastname).to.equal(dataset.data2.lastname);
                expect(getUpdatedBookingResp.data.totalprice).to.equal(dataset.data2.totalprice);
                expect(getUpdatedBookingResp.data.depositpaid).to.equal(dataset.data2.depositpaid);
                expect(getUpdatedBookingResp.data.bookingdates.checkin).to.equal(dataset.data2.bookingdates.checkin);
                expect(getUpdatedBookingResp.data.bookingdates.checkout).to.equal(dataset.data2.bookingdates.checkout);
                expect(getUpdatedBookingResp.data.additionalneeds).to.equal(dataset.data2.additionalneeds);
            }
            //request delete here
            const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
            expect(delBookingResp.status).to.equal(201);
            //check if deleted
            const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
            expect(confirmDelResp.status).to.equal(404);
        });
    }

    for (const dataset of apiData.ubDates) {
        it('Verify UpdateBooking: '+dataset.desc, async function () {
            //create booking
            const createBookingResp = await ApiMethods.createBooking(dataset.data1);
            expect(createBookingResp.status).to.equal(dataset.expectedStatus1);
            addContext(this, { title: "CreateBooking request body: ", value: dataset.data1 });
            addContext(this, { title: "CreateBooking API response code", value: createBookingResp.status });

            //get booking to check if the newly created booking exists and can be searched
            const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
            expect(getBookingResp.status).to.equal(dataset.expectedStatus1);
            expect(getBookingResp.data.firstname).to.equal(dataset.data1.firstname);
            expect(getBookingResp.data.lastname).to.equal(dataset.data1.lastname);
            expect(getBookingResp.data.totalprice).to.equal(dataset.data1.totalprice);
            expect(getBookingResp.data.depositpaid).to.equal(dataset.data1.depositpaid);
            expect(getBookingResp.data.bookingdates.checkin).to.equal(dataset.data1.bookingdates.checkin);
            expect(getBookingResp.data.bookingdates.checkout).to.equal(dataset.data1.bookingdates.checkout);
            expect(getBookingResp.data.additionalneeds).to.equal(dataset.data1.additionalneeds);
            addContext(this, { title: "GetBooking API response code", value: getBookingResp.status });
            addContext(this, { title: "GetBooking API response body", value: getBookingResp.data });

            const updateBookingResp = await ApiMethods.updateBooking(tokenResp, createBookingResp.data.bookingid, dataset.data2);
            expect(updateBookingResp.status).to.equal(dataset.expectedStatus2);
            addContext(this, { title: "UpdateBooking request body: ", value: dataset.data2 });
            addContext(this, { title: "UpdateBooking API response code", value: updateBookingResp.status });

            if (dataset.expectedStatus2 == 200) {
                //get booking to check if the newly created booking exists and can be searched
                const getUpdatedBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
                addContext(this, { title: "(After Update) GetBooking API response code", value: getUpdatedBookingResp.status });
                addContext(this, { title: "(After Update) GetBooking API response body", value: getUpdatedBookingResp.data });
                expect(getUpdatedBookingResp.status).to.equal(200);
                expect(getUpdatedBookingResp.data.firstname).to.equal(dataset.data2.firstname);
                expect(getUpdatedBookingResp.data.lastname).to.equal(dataset.data2.lastname);
                expect(getUpdatedBookingResp.data.totalprice).to.equal(dataset.data2.totalprice);
                expect(getUpdatedBookingResp.data.depositpaid).to.equal(dataset.data2.depositpaid);
                expect(getUpdatedBookingResp.data.bookingdates.checkin).to.equal(dataset.expectedCheckin);
                expect(getUpdatedBookingResp.data.bookingdates.checkout).to.equal(dataset.expectedCheckout);
                expect(getUpdatedBookingResp.data.additionalneeds).to.equal(dataset.data2.additionalneeds);
            }
            //request delete here
            const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
            expect(delBookingResp.status).to.equal(201);
            //check if deleted
            const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
            expect(confirmDelResp.status).to.equal(404);
        });
    }

    for (const dataset of apiData.ubAddtlNeeds) {
        it('Verify UpdateBooking: '+dataset.desc, async function () {
            //create booking
            const createBookingResp = await ApiMethods.createBooking(dataset.data1);
            expect(createBookingResp.status).to.equal(dataset.expectedStatus1);
            addContext(this, { title: "CreateBooking request body: ", value: dataset.data1 });
            addContext(this, { title: "CreateBooking API response code", value: createBookingResp.status });

            //get booking to check if the newly created booking exists and can be searched
            const getBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
            expect(getBookingResp.status).to.equal(dataset.expectedStatus1);
            expect(getBookingResp.data.firstname).to.equal(dataset.data1.firstname);
            expect(getBookingResp.data.lastname).to.equal(dataset.data1.lastname);
            expect(getBookingResp.data.totalprice).to.equal(dataset.data1.totalprice);
            expect(getBookingResp.data.depositpaid).to.equal(dataset.data1.depositpaid);
            expect(getBookingResp.data.bookingdates.checkin).to.equal(dataset.data1.bookingdates.checkin);
            expect(getBookingResp.data.bookingdates.checkout).to.equal(dataset.data1.bookingdates.checkout);
            expect(getBookingResp.data.additionalneeds).to.equal(dataset.data1.additionalneeds);
            addContext(this, { title: "GetBooking API response code", value: getBookingResp.status });
            addContext(this, { title: "GetBooking API response body", value: getBookingResp.data });

            const updateBookingResp = await ApiMethods.updateBooking(tokenResp, createBookingResp.data.bookingid, dataset.data2);
            expect(updateBookingResp.status).to.equal(dataset.expectedStatus2);
            addContext(this, { title: "UpdateBooking request body: ", value: dataset.data2 });
            addContext(this, { title: "UpdateBooking API response code", value: updateBookingResp.status });

            if (dataset.expectedStatus2 == 200) {
                //get booking to check if the newly created booking exists and can be searched
                const getUpdatedBookingResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
                addContext(this, { title: "(After Update) GetBooking API response code", value: getUpdatedBookingResp.status });
                addContext(this, { title: "(After Update) GetBooking API response body", value: getUpdatedBookingResp.data });
                expect(getUpdatedBookingResp.status).to.equal(200);
                expect(getUpdatedBookingResp.data.firstname).to.equal(dataset.data2.firstname);
                expect(getUpdatedBookingResp.data.lastname).to.equal(dataset.data2.lastname);
                expect(getUpdatedBookingResp.data.totalprice).to.equal(dataset.data2.totalprice);
                expect(getUpdatedBookingResp.data.depositpaid).to.equal(dataset.data2.depositpaid);
                expect(getUpdatedBookingResp.data.bookingdates.checkin).to.equal(dataset.expectedCheckin);
                expect(getUpdatedBookingResp.data.bookingdates.checkout).to.equal(dataset.expectedCheckout);
                expect(getUpdatedBookingResp.data.additionalneeds).to.equal(dataset.expectedAddtlNeeds);
            }
            //request delete here
            const delBookingResp = await ApiMethods.deleteBooking(tokenResp, createBookingResp.data.bookingid);
            expect(delBookingResp.status).to.equal(201);
            //check if deleted
            const confirmDelResp = await ApiMethods.getBooking(createBookingResp.data.bookingid);
            expect(confirmDelResp.status).to.equal(404);
        });
    }
});