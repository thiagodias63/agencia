<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Agenda de Cov."
      title="Agenda de Covergencia"
    >
    <template slot="links">
        <sidebar-item :link="{name: 'Home', icon: 'fa fa-home', path: '/'}"/>
        <sidebar-item :link="{name: 'Eixos', icon: 'fa fa-certificate', path: '/eixos'}"/>
        <sidebar-item :link="{name: 'Funcionários', icon: 'fa fa-user-friends', path: '/funcionarios'}"/>
        <sidebar-item :link="{name: 'Projetos', icon: 'fab fa-buromobelexperte', path: '/projetos'}"/>
        <sidebar-item :link="{name: 'Sair', icon: 'fa fa-door-open', path: '/logout'}"/>
    </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
      </div>
    </div>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getUsuarioLogado'])
  },
  components: {
  //   ContentFooter,
    FadeTransition
  },
  data() {
    return {
      sidebarBackground: 'blue' //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  created() {
      // if (this.getUsuarioLogado.find == 'cookie') {
      //     this.registrarLogin({ ...this.getUsuarioLogado.user })
      // } else if (!this.getUsuarioLogado.find) {
      //     this.$router.push({name: 'Logout'});
      // }
  }
};
</script>
<style lang="scss">
.is-invalid {
  border: 1px solid #fb6340 !important;
}
</style>
