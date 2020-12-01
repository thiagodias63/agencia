<template>
    <div class="wrapper" :class="{ 'nav-open': true }">
        <side-bar
        :background-color="sidebarBackground"
        short-title="Agenda de Cov."
        title="Agenda de Covergencia"
        >
        <template slot="links">
            <sidebar-item :link="{name: 'Home', icon: 'fa fa-home', path: '/home'}"/>
        </template>
        </side-bar>
        <div class="main-content" :data="sidebarBackground">

        <div @click="toggleSidebar">
            <fade-transition :duration="200" origin="center top" mode="out-in">
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
            </fade-transition>
        </div>
        </div>
    </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions';
import Loader from '@/components/loader'
import EixoService from '@/services/eixos.service'
export default {
  title: 'Agenda de Convergência - Vale do Aço',
  data() {
      return {
          isLoading: false,
          eixos: [],
          sidebarBackground: 'blue'
      }
  },
  components: {
      'app-loader': Loader,
      FadeTransition
  },
  methods: {
    carregarEixos() {
      this.isLoading = true;
      EixoService.getAll().then((response) => {
        this.isLoading = false;
        this.eixos = response.data || [];
      })
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  created() {
    this.carregarEixos()
  }
};
</script>

<style lang="css">
.home {
    width: 100vw;
    height: 100vh;
    padding: 15vh 15vw;
    background: linear-gradient(87deg, #000046 0, #1CB5E0 100%) !important;
}
</style>