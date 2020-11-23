import axios from 'axios'
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

    edit(id) {
        return axios.put('' + id)
    },

    remove(id) {
        return axios.delete('' + id)
    },

}