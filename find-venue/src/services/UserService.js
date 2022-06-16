import axios from "axios";
import {user} from "../stores.js";

export class UserService {
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        const userCredentials = localStorage.findvenue
        if (userCredentials) {
            const savedUser = JSON.parse(userCredentials)
            user.set({
                email: savedUser.email,
                token: savedUser.token,
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/rest-api/users/authenticate`, {email, password});
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                });
                localStorage.findvenue = JSON.stringify({email: email, token: response.data.token});
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        user.set({
            email: "",
            token: "",
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("findvenue");
    }

    async signup(firstName, lastName, email, username, password) {
        try {
            const userDetails = {
                firstname: firstName,
                lastname: lastName,
                username: username,
                email: email,
                password: password,
            };
            await axios.post(this.baseUrl + "/rest-api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getUser(id) {
        try {
            const res = await axios.get(`${this.baseUrl}/rest-api/users/${id}`);
            return res.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getAllUsers() {
        try {
            const res = await axios.get(`${this.baseUrl}/rest-api/users`);
            return res.data;
        } catch (e) {
            return [];
        }
    }

    async setAdmin(id) {
        try {
            const userDetails = {
                isadmin: true,
            };
            await axios.put(this.baseUrl + `/rest-api/users/${id}`, userDetails);
            return true;
        } catch (error) {
            return false;
        }
    }

    async updateName(id, firstname, lastname) {
        try {
            const userDetails = {
                firstname: firstname,
                lastname: lastname,
            };
            await axios.put(this.baseUrl + `/rest-api/users/${id}`, userDetails);
            return true;
        } catch (error) {
            return false;
        }
    }

    async updatePassword(id, password) {
        try {
            const userDetails = {
                password: password,
            };
            await axios.put(this.baseUrl + `/rest-api/users/${id}`, userDetails);
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteUser(id) {
        try {
            await axios.delete(this.baseUrl + `/rest-api/users/${id}`);
            return true;
        } catch (error) {
            return false;
        }
    }

}