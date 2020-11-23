import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layout/Main'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'index',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('./pages/index.vue')
        },
        {
          path: '/projetos',
          name: 'projetos',
          component: () => import('./pages/projetos')
        }, 
        {
          path: '/projetos/cadastrar',
          name: 'projetos-cadastrar',
          component: () => import('./pages/projetos/cadastrar')
        },
        {
          path: '/projetos/:id',
          name: 'projetos-editar',
          component: () => import('./pages/projetos/editar')
        },
        {
          path: '/funcionarios',
          name: 'funcionarios',
          component: () => import('./pages/funcionarios')
        },        
        {
          path: '/funcionarios/cadastrar',
          name: 'funcionarios-cadastrar',
          component: () => import('./pages/funcionarios/cadastrar')
        },
        {
          path: '/funcionarios/:id',
          name: 'funcionarios-editar',
          component: () => import('./pages/funcionarios/editar')
        },
        {
          path: '/eixos',
          name: 'eixos',
          component: () => import('./pages/eixos')
        },
        {
          path: '/eixos/cadastrar',
          name: 'eixos-cadastrar',
          component: () => import('./pages/eixos/cadastrar')
        },
        {
          path: '/eixos/:id',
          name: 'eixos-editar',
          component: () => import('./pages/eixos/editar')
        },
      ]
    },
  ]
})
