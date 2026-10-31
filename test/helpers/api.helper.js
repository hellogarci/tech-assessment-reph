import axios from 'axios';

class ApiHelper {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://restful-booker.herokuapp.com',
            timeout: 5000,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    async createToken(cred) {
        try {
            const response = await this.client.post('/auth', cred);
            return response;
        } catch (error) {
            throw new Error(`Create Token API Setup Failed: ${error.message}`);
        }
    }

    async createBooking(bookingDetails) {
        try {
            const response = await this.client.post('/booking', bookingDetails);
            return response;
        } catch (error) {
            throw new Error(`Create Booking API Setup Failed: ${error.message}`);
        }
    }

    async updateBooking(idNum, bookingDetails) {
        try {
            const response = await this.client.put('/booking/'+idNum, bookingDetails);
            return response;
        } catch (error) {
            throw new Error(`Update Booking API Setup Failed: ${error.message}`);
        }
    }

    async getBooking(idNum) {
        try {
            const response = await this.client.get('/booking/'+idNum);
            return response;
        } catch (error) {
            throw new Error(`Get Booking API Setup Failed: ${error.message}`);
        }
    }

    async getBookingIds(bookingDetails) {
        try {
            const response = await this.client.get('/booking', bookingDetails);
            return response;
        } catch (error) {
            throw new Error(`Get Booking IDs API Setup Failed: ${error.message}`);
        }
    }

    async deleteBooking(idNum, token) {
        try {
            const response = await this.client.get(
                '/booking/'+idNum,
                { headers: {
                    'Cookie': 'token=' + token
                }}
            );
            return response;
        } catch (error) {
            throw new Error(`Delete Booking API Setup Failed: ${error.message}`);
        }
    }
}

export default new ApiHelper();