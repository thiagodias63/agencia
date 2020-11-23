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
            EixoService.getAll().then((data) => {
                this.carregandoEixos = false;
                this.eixos = data.eixos || []
                // this.eixos = [{ id: 1, nome: 'A'}]
            })
        }
    }
}