import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layout/Main'
import LoginLayout from '@/layout/Login'
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
      name: 'home',
      component: Home,
    },
    {
      path: '/admin',
      redirect: 'index',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('./pages/index.vue')
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
