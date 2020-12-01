import FuncionarioService from '../../services/funcionarios.service'
export default {
    data() {
        return {
            carregandoFuncionarios: false,
            funcionarios: []
        }
    },
    created() {
        this.carregarFuncionarios();
    },
    methods: {
        carregarFuncionarios() {
            this.carregandoFuncionarios = true;
            FuncionarioService.getAll().then((response) => {
                this.carregandoFuncionarios = false;
                this.funcionarios = response.data || []
            })
        }
    }
}