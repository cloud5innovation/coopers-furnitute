import axios from 'axios';
const instance = axios.create({
    baseURL: "http://localhost:8900/",
    // baseURL: "https://coopers-furniture.herokuapp.com/"
}); 

export default instance;