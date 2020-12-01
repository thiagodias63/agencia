import axios from './axios.service'
export default {

    getAll() {
        return axios.get('eixos')
    },

    getOne(id) {
        return axios.get('eixos/' + id)
    },

    save(eixo) {
        return axios.post('eixos', eixo)
    },

    edit(id, eixo) {
        return axios.patch('eixos/' + id, eixo)
    },

    remove(id) {
        return axios.delete('eixos/' + id)
    },

}