import EixoService from '../../services/eixos.service'
export default {
    data() {
        return {
            carregandoEixos: false,
            eixos: []
        }
    },
    created() {
        this.carregarEixos();
    },
    methods: {
        carregarEixos() {
            this.carregandoEixos = true;
            EixoService.getAll().then((response) => {
                this.carregandoEixos = false;
                this.eixos = response.data || []
            })
        }
    }
}