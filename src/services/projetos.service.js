import axios from './axios.service'
export default {

    getAll() {
        return axios.get('')
    },

    getOne(id) {
        return axios.get('' + id)
    },

    save(projeto) {
        return axios.post('', { projeto })
    },

    edit(id, projeto) {
        return axios.put('' + id, { projeto })
    },

    remove(id) {
        return axios.delete('' + id)
    },

}