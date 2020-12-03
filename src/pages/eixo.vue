<template>
    <div class="home container-fluid">
        <div v-if="!isLoading" class="row">
            <div class="col-md-4" v-for="(eixo, index) in eixos" :key="index">
                <div class="card shadow" @click="marcarEixo(eixo)" style="cursor: pointer">
                    <div class="card-header border-0">
                    <div class="row align-items-center">
                        <div class="col text-center">
                        <span>
                            Eixo
                        </span>
                        <h3 class="mb-0">
                            {{ eixo.nome }}
                        </h3>
                        </div>
                    </div>
                    </div>
                </div>
                <br>
            </div>
            <div class="col-md-12">
                <br><br>
                <div class="card shadow" style="cursor: pointer">
                    <img  style="width: 100%; height: 50%;" src="img/brand/patrocinadores.jpg" alt="Patrocinadores">
                </div>
            </div>
        </div>
        
        <div v-if="isLoading">
            <app-loader></app-loader>
        </div>
    </div>
</template>
<script>
import Loader from '@/components/loader'
import PublicService from '@/services/public.service'
export default {
  title: 'Agenda de Convergência - Vale do Aço',
  data() {
      return {
        isLoading: false,
        eixos: [],
        eixoSelecionado: null,
        projetos: [],
        estados: []
      }
  },
  components: {
      'app-loader': Loader,
  },
  methods: {
    carregarEixos() {
      this.isLoading = true;
      PublicService.getEixos().then((response) => {
        this.isLoading = false;
        this.eixos = response.data || [];
      })
    },
    marcarEixo(eixo) {
        this.$router.push('projetos/' + eixo.id)
    },
  },
  created() {
    this.carregarEixos();
  }
};
</script>
