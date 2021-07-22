import axios from "axios";

const instance = axios.create({
    baseURL : '...'//the api url cloud function
})


export default instance;