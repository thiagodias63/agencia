import axios from './axios.service'
export default {

    getEixos() {
        return axios.get('public/eixos')
    },

    getProjetos(id) {
        return axios.get(`public/eixos/${id}/projetos`)
    },

    getEstados() {
        return axios.get(`public/estados`)
    },

}