import axios from "axios";

export class VenueService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getVenues() {
        try {
            const response = await axios.get(this.baseUrl + "/rest-api/poi");
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async getVenue(id) {
        try {
            const response = await axios.get(this.baseUrl + `/rest-api/poi/${id}`);
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async createVenue(title, description, lat, long, categories) {
        try {
            let newVenue = {
                title: title,
                description: description,
                latitude: lat,
                longitude: long,
                categories: categories,
            }
            const res = await axios.post(`${this.baseUrl}/rest-api/poi`, newVenue);
            return true;
        } catch (e) {
            return false;
        }

    }

    async updateVenue(id, updateValues) {
        try {
            const res = await axios.put(`${this.baseUrl}/rest-api/poi/${id}`, updateValues);
            return true;
        } catch (e) {
            return false;
        }
    }

    async getCategories() {
        try {
            const response = await axios.get(`${this.baseUrl}/rest-api/poi/categories`);
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async createCategory(title, description) {
        try {
            let newCategory = {
                title: title,
                description: description,
            }
            const res = await axios.post(`${this.baseUrl}/rest-api/poi/categories`, newCategory);
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }
}