import axios from './axios.service'
export default {

    getAll() {
        return axios.get('public/estados')
    },

    getOne(id) {
        return axios.get('public/estados/' + id)
    },

    save(estado) {
        return axios.post('public/estados', estado)
    },

    edit(id, estado) {
        return axios.patch('public/estados/' + id, estado)
    },

    remove(id) {
        return axios.delete('public/estados/' + id)
    },

}