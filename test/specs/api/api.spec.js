import apiData from '../../data/api/api.data.json' with { type: 'json' };
import ApiHelper from '../../helpers/api.helper.js';
import allureReporter from '@wdio/allure-reporter'
let token;

describe('API Automation', () => {

    it('create a token', async () => {
        const cred = {
            "username": "admin",
            "password": "password123"
        }

        const response = await ApiHelper.createToken(cred);
        await expect(response.status).toBe(200);
        token = await response.data.token;
        console.log("token:::::: " + response.data.token);
    });

    it('Create a booking with complete details', async () => {
        const bookingDetails = {
            "firstname": apiData.cb[0].firstname,
            "lastname": apiData.cb[0].lastname,
            "totalprice": apiData.cb[0].totalprice,
            "depositpaid": apiData.cb[0].depositpaid,
            "bookingdates": {
                "checkin": apiData.cb[0].checkin,
                "checkout": apiData.cb[0].checkout
            },
            "additionalneeds": apiData.cb[0].additionalneeds
        }
        //create booking
        const createBookingResp = await ApiHelper.createBooking(bookingDetails);
        await expect(createBookingResp.status).toBe(200);
        // console.log(createBookingResp.data);
        // console.log("bookingid:::::: " + createBookingResp.data.bookingid);

        //get booking to check if the newly created booking exists and can be searched
        // console.log("bookingid for getbooking api:::::: " + createBookingResp.data.bookingid);
        const getBookingResp = await ApiHelper.getBooking(createBookingResp.data.bookingid);
        await expect(getBookingResp.status).toBe(200);
        // console.log(getBookingResp.data);
        await expect(getBookingResp.data.firstname).toEqual(apiData.cb[0].firstname);
        await expect(getBookingResp.data.lastname).toEqual(apiData.cb[0].lastname);
        await expect(getBookingResp.data.totalprice).toEqual(apiData.cb[0].totalprice);
        await expect(getBookingResp.data.depositpaid).toEqual(apiData.cb[0].depositpaid);
        await expect(getBookingResp.data.bookingdates.checkin).toEqual(apiData.cb[0].checkin);
        await expect(getBookingResp.data.bookingdates.checkout).toEqual(apiData.cb[0].checkout);
        await expect(getBookingResp.data.additionalneeds).toEqual(apiData.cb[0].additionalneeds);
    });

    it.only('Update a booking with complete details', async () => {
        const bookingDetails = {
            "firstname": apiData.cb[0].firstname,
            "lastname": apiData.cb[0].lastname,
            "totalprice": apiData.cb[0].totalprice,
            "depositpaid": apiData.cb[0].depositpaid,
            "bookingdates": {
                "checkin": apiData.cb[0].checkin,
                "checkout": apiData.cb[0].checkout
            },
            "additionalneeds": apiData.cb[0].additionalneeds
        }
        //create booking
        const createBookingResp = await ApiHelper.createBooking(bookingDetails);
        await expect(createBookingResp.status).toBe(200);
        // console.log(createBookingResp.data);
        // console.log("bookingid:::::: " + createBookingResp.data.bookingid);

        const newBookingDetails = {
            "firstname": apiData.cb[1].firstname,
            "lastname": apiData.cb[1].lastname,
            "totalprice": apiData.cb[1].totalprice,
            "depositpaid": apiData.cb[1].depositpaid,
            "bookingdates": {
                "checkin": apiData.cb[1].checkin,
                "checkout": apiData.cb[1].checkout
            },
            "additionalneeds": apiData.cb[0].additionalneeds
        }
        const response = await ApiHelper.updateBooking(createBookingResp.data.bookingid, newBookingDetails);
        await expect(response.status).toBe(200);
        console.log(response.data);
        console.log(response.data.bookingid);
        bookingId = response.data.bookingId;
    });



    it('Get a booking using ID', async () => {
        console.log("bookingid for getbooking api:::::: " + bookingId);
        const response = await ApiHelper.getBooking(bookingId);
        await expect(response.status).toBe(200);
        console.log(response.data);
    });

    it('Get a booking using booking details', async () => {
        const bookingDetails = {
            "firstname": apiData.cb[0].firstname,
            "lastname": apiData.cb[0].lastname
        }
        const response = await ApiHelper.getBookingIds(bookingDetails);
        await expect(response.status).toBe(200);
        await expect(response.data.bookingid).toEqual(bookingId);
        console.log(response.data);
    });

    it('Delete a booking', async () => {
        const response = await ApiHelper.deleteBooking(bookingId);
        await expect(response.status).toBe(201);
        console.log(response.data);
    });















    it('practice', async () => {
        await allureReporter.addStory('Develop tests for CreateBooking API endpoint with assertions for the response fields');
        // const bookingDetails = {
        //     "firstname": "Jim",
        //     "lastname": "Brown",
        //     // "checkin": "2023-06-01",
        //     // "checkout": "2026-10-31"
        // }
        // const response = await ApiHelper.getBookingIds(bookingDetails);

        // await expect(response.status).toBe(200);
        // console.log(response.data);

        ////////////////////////////////
        // const bookingID = '2915';
        const response = await ApiHelper.getBooking(bookingId);
        await expect(response.status).toBe(200);
        // await expect(response.data.firstname).toEqual('Sally');
        // await expect(response.data.lastname).toEqual('Brown');
        console.log(response.data);

        // const bookingDetails = {
        //     "firstname": apiData.cb[0].firstname,
        //     "lastname": apiData.cb[0].lastname,
        // }
        // const response = await ApiHelper.createBooking(bookingDetails);

    });
});