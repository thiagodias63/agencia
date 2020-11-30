import axios from 'axios'
export default {
    signin(user) {
        return axios.post('', user)
    },

}