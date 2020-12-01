import axios from './axios.service'
export default {

    getAll() {
        return axios.get('')
    },

    getOne(id) {
        return axios.get('' + id)
    },

    save(eixo) {
        return axios.post('', { eixo })
    },

    edit(id, eixo) {
        return axios.put('' + id, { eixo })
    },

    remove(id) {
        return axios.delete('' + id)
    },

}