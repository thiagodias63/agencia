<template>
    <div class="wrapper" :class="{ 'nav-open': true }">
        <side-bar
        :background-color="sidebarBackground"
        short-title="Agenda de Cov."
        title="Agenda de Covergencia"
        >
        <template slot="links">
            <sidebar-item :link="{name: 'Home', icon: 'fa fa-home', path: '/'}"/>
            <sidebar-item :link="{name: 'Eixos', icon: 'fa fa-certificate', path: '/eixos'}"/>
            <sidebar-item :link="{name: 'Sobre', icon: 'fa fa-archive', path: '#'}" id="sobre-li" />
            <sidebar-item v-if="showAbout" class="subitem" :link="{name: 'Contatos', icon: 'fa fa-phone', path: '/contatos'}"/>
            <sidebar-item v-if="showAbout" class="subitem" :link="{name: 'Editorial', icon: 'fa fa-book', path: '/editorial'}"/>
            <sidebar-item v-if="showAbout" class="subitem" :link="{name: 'Entidades Participantes', icon: 'fas fa-users', path: '/entidades-participantes'}"/>
            <sidebar-item v-if="showAbout" class="subitem" :link="{name: 'Modelo de governança', icon: 'fa fa-folder-open', path: '/modelo-de-governanca'}"/>
            <sidebar-item v-if="showAbout" class="subitem" :link="{name: 'Visão de Futuro', icon: 'fa fa-road', path: '/visao-de-futuro'}"/>
            <sidebar-item :link="{name: 'Fale Conosco', icon: 'fa fa-paper-plane', path: '/fale-conosco'}"/>
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
      sidebarBackground: 'blue',
      showAbout: false
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  mounted() {
    document.querySelector("#sobre-li a").setAttribute("href", "");
    document.querySelector("#sobre-li").addEventListener('click', () => {
      this.showAbout = !this.showAbout;
    })
  }
};
</script>
<style lang="css">
.home {
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 15vh 15vw;
  background: linear-gradient(87deg, #000046 0, #1CB5E0 100%) !important;
}
.subitem {
  margin-left: 12px;
  
}
</style>