import axios from './axios.service'
export default {

    getAll(projetoId) {
        return axios.get(`/projetos/${projetoId}/macro_acoes`)
    },

    getOne(projetoId, id) {
        return axios.get(`/projetos/${projetoId}/macro_acoes/${id}`)
    },

    save(projetoId, marco) {
        return axios.post(`/projetos/${projetoId}/macro_acoes`, marco)
    },

    edit(projetoId, id, macro) {
        return axios.put(`/projetos/${projetoId}/macro_acoes/${id}`, macro)
    },

    remove(projetoId, id) {
        return axios.delete(`/projetos/${projetoId}/macro_acoes/${id}`)
    },

}