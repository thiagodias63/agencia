import axios from './axios.service'
export default {

    getAll() {
        return axios.get('projetos')
    },

    getOne(id) {
        return axios.get('projetos/' + id)
    },

    save(projeto) {
        return axios.post('projetos', projeto)
    },

    edit(id, projeto) {
        return axios.put('projetos/' + id, projeto)
    },

    remove(id) {
        return axios.delete('projetos/' + id)
    },

}