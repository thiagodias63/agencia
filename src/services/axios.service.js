import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://deiferson.com/api/'
});

export default instance