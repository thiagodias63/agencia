import axios from './axios.service'
export default {

    getAll() {
        return axios.get('')
    },

    getOne(id) {
        return axios.get('' + id)
    },

    save(funcionario) {
        return axios.post('', { funcionario })
    },

    edit(id, funcionario) {
        return axios.put('' + id, { funcionario })
    },

    remove(id) {
        return axios.delete('' + id)
    },

}