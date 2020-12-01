import axios from './axios.service'
export default {
    signin(user) {
        return axios.post('', user)
    },

}