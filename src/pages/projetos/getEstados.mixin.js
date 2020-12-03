import EstadoService from '../../services/estado.service'
export default {
    data() {
        return {
            carregandoEstados: false,
            estados: []
        }
    },
    created() {
        this.carregarEstados();
    },
    methods: {
        carregarEstados() {
            this.carregandoEstados = true;
            EstadoService.getAll().then((response) => {
                this.carregandoEstados = false;
                this.estados = response.data || []
            })
        }
    }
}