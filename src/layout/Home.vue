<template>
    <div class="wrapper" :class="{ 'nav-open': true }">
        <side-bar
        :background-color="sidebarBackground"
        short-title="Agenda de Cov."
        title="Agenda de Covergencia"
        >
        <template slot="links">
            <sidebar-item :link="{name: 'Home', icon: 'fa fa-home', path: '/'}"/>
            <sidebar-item :link="{name: 'O Programa', icon: 'fa fa-archive', path: '/'}"/>
            <sidebar-item :link="{name: 'Fale Conosco', icon: 'fa fa-paper-plane', path: '/'}"/>
            <sidebar-item :link="{name: 'Admin', icon: 'fa fa-lock', path: '/admin'}"/>
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
export default {
  components: {
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