import Vue from 'vue'
import Router from 'vue-router'
import AdminLayout from '@/layout/Admin'
import LoginLayout from '@/layout/Login'
import HomeLayout from '@/layout/Home'
import Logout from '@/pages/logout'
import Home from '@/pages/home'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginLayout,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
    },
    {
      path: '/',
      redirect: 'home',
      component: HomeLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/eixos',
          name: 'eixos',
          component: () => import('./pages/eixo.vue'),
        },
        {
          path: '/projetos/:id',
          name: 'projetos',
          component: () => import('./pages/projeto.vue'),
        },
        {
          name: 'contatos',
          path: '/contatos',
          component: () => import('./pages/contatos.vue')
        },
        {
          name: 'editorial',
          path: '/editorial',
          component: () => import('./pages/editorial.vue')
        },
        {
          name: 'entidades-participantes',
          path: '/entidades-participantes',
          component: () => import('./pages/entidades-participantes.vue')
        },
        {
          name: 'modelo-de-governanca',
          path: '/modelo-de-governanca',
          component: () => import('./pages/modelo-de-governanca.vue')
        },
        {
          name: 'visao-de-futuro',
          path: '/visao-de-futuro',
          component: () => import('./pages/visao-de-futuro.vue')
        },
        {
          path: '/programa',
          name: 'programa',
          component: () => import('./pages/programa.vue'),
        },
        {
          path: '/fale-conosco',
          name: 'fale-conosco',
          component: () => import('./pages/fale-conosco.vue'),
        },
      ]
    },
    {
      path: '/admin',
      redirect: 'index',
      component: AdminLayout,
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('./pages/index.vue')
        },
        
        {
          path: '/admin/projetos/:projeto/macro-acoes',
          name: 'macro-acoes',
          component: () => import('./pages/projetos/macro-acoes')
        },
        {
          path: '/admin/projetos/:projeto/macro-acoes/cadastrar',
          name: 'macro-acoes-cadastrar',
          component: () => import('./pages/projetos/macro-acoes/cadastrar')
        },
        {
          path: '/admin/projetos/:projeto/macro-acoes/:id',
          name: 'macros-editar',
          component: () => import('./pages/projetos/macro-acoes/editar')
        },
        {
          path: '/admin/projetos',
          name: 'projetos',
          component: () => import('./pages/projetos')
        }, 
        {
          path: '/admin/projetos/cadastrar',
          name: 'projetos-cadastrar',
          component: () => import('./pages/projetos/cadastrar')
        },
        {
          path: '/admin/projetos/:id',
          name: 'projetos-editar',
          component: () => import('./pages/projetos/editar')
        },
        {
          path: '/admin/funcionarios',
          name: 'funcionarios',
          component: () => import('./pages/funcionarios')
        },        
        {
          path: '/admin/funcionarios/cadastrar',
          name: 'funcionarios-cadastrar',
          component: () => import('./pages/funcionarios/cadastrar')
        },
        {
          path: '/admin/funcionarios/:id',
          name: 'funcionarios-editar',
          component: () => import('./pages/funcionarios/editar')
        },
        {
          path: '/admin/eixos',
          name: 'eixos',
          component: () => import('./pages/eixos')
        },
        {
          path: '/admin/eixos/cadastrar',
          name: 'eixos-cadastrar',
          component: () => import('./pages/eixos/cadastrar')
        },
        {
          path: '/admin/eixos/:id',
          name: 'eixos-editar',
          component: () => import('./pages/eixos/editar')
        },
      ]
    },
  ]
})
