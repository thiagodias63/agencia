import axios from './axios.service'
export default {

    getAll() {
        return axios.get('funcionarios')
    },

    getOne(id) {
        return axios.get('funcionarios/' + id)
    },

    save(funcionario) {
        return axios.post('funcionarios', funcionario)
    },

    edit(id, funcionario) {
        return axios.put('funcionarios/' + id, funcionario)
    },

    remove(id) {
        return axios.delete('funcionarios/' + id)
    },

}