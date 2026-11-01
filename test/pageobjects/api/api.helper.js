import axios from 'axios';

class ApiMethods {
    constructor() {
        this.clientRequest = axios.create({
            baseURL: 'https://restful-booker.herokuapp.com',
            timeout: 10000,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            validateStatus: (status) => status < 600
        });
    }

    async createToken() {
        const cred = {
            "username": "admin",
            "password": "password123"
        }
        try {
            const response = await this.clientRequest.post('/auth', cred);
            // return response;
            // console.log("token:::::: " + response.data.token);
            return response.data.token;
        } catch (error) {
            throw new Error(`Create Token API Setup Failed: ${error.message}`);
        }
    }

    async createBooking(bookingDetails) {
        try {
            const response = await this.clientRequest.post('/booking', bookingDetails);
            return response;
        } catch (error) {
            throw new Error(`Create Booking API Setup Failed: ${error.message}`);
        }
    }

    async updateBooking(genToken, idNum, bookingDetails) {
        try {
            // const genToken = await this.createToken();
            let options = {
                headers: {
                    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
                    'Cookie': 'token='+genToken
                }
            }
            const response = await this.clientRequest.put(
                '/booking/'+idNum,
                bookingDetails,
                options,
            );
            return response;
        } catch (error) {
            throw new Error(`Update Booking API Setup Failed: ${error.message}`);
        }
    }

    async getBooking(idNum) {
        // try {
            const response = await this.clientRequest.get('/booking/'+idNum);
            return response;
        // } catch (error) {
        //     throw new Error(`Get Booking API Setup Failed: ${error.message}`);
        // }
    }

    async deleteBooking(genToken, idNum) {
        try {
            // const genToken = await this.createToken();
            let options = {
                headers: {
                    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
                    'Cookie': 'token='+genToken
                }
            }
            const response = await this.clientRequest.delete(
                '/booking/'+idNum,
                options
            );
            return response;
        } catch (error) {
            throw new Error(`Delete Booking API Setup Failed: ${error.message}`);
        }
    }
}

export default new ApiMethods();