import Vue from 'vue'
import Router from 'vue-router'
import AdminLayout from '@/layout/Admin'
import LoginLayout from '@/layout/Login'
import HomeLayout from '@/layout/Home'
import Logout from '@/pages/logout'
import Eixo from '@/pages/eixo'
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
          name: 'eixo',
          component: Eixo,
        },
        {
          path: '/programa',
          name: 'programa',
          component: () => import('./pages/programa.vue'),
        },
        {
          path: '/contato',
          name: 'contato',
          component: () => import('./pages/contato.vue'),
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
