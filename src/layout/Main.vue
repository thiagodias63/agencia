<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Agenda de Cov."
      title="Agenda de Covergencia"
    >
    <template slot="links">
        <sidebar-item :link="{name: 'Home', icon: '', path: '/'}"/>
        <sidebar-item :link="{name: 'Eixos', icon: '', path: '/eixos'}"/>
        <sidebar-item :link="{name: 'Funcionários', icon: '', path: '/funcionarios'}"/>
        <sidebar-item :link="{name: 'Projetos', icon: '', path: '/projetos'}"/>
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
//   import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
    //   ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
.is-invalid {
  border: 1px solid #fb6340 !important;
}
</style>
