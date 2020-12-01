<template>
    <div class="home container-fluid">
        <div v-if="!isLoading" class="row">
            <div class="col-md-4" v-for="(eixo, index) in eixos" :key="index">
            <div class="card shadow" style="cursor: pointer">
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
        </div>
        <div v-if="isLoading">
            <app-loader></app-loader>
        </div>
    </div>
</template>
<script>
import Loader from '@/components/loader'
import EixoService from '@/services/eixos.service'
export default {
  title: 'Agenda de Convergência - Vale do Aço',
  data() {
      return {
          isLoading: false,
          eixos: [],
      }
  },
  components: {
      'app-loader': Loader,
  },
  methods: {
    carregarEixos() {
      this.isLoading = true;
      EixoService.getAll().then((response) => {
        this.isLoading = false;
        this.eixos = response.data || [];
      })
    },
  },
  created() {
    this.carregarEixos()
  }
};
</script>
