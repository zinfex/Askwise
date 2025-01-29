import axios from 'axios';

const Api = axios.create({
    baseURL: "",
    headers: {
  
        'Content-Type': 'application/json',
    }
})

export default Api;