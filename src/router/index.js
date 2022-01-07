import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'Formulário de Cadastro' }
        // children: [
        //   {
        //     path: ':id',
        //     name: 'Detail',
        //     component: () => import('@/views/home/components/detail.vue')
        //   }
        // ]
      },
      {
        path: '/lista',
        name: 'Lista',
        component: () => import('@/views/lista/index.vue'),
        meta: { title: 'Lista de Países' }
      },
      {
        path: '/busca',
        name: 'Busca',
        component: () => import('@/views/busca/index.vue'),
        meta: { title: 'Busca de Países' }
      },
      {
        path: '/comparador',
        name: 'Comparador',
        component: () => import('@/views/comparador/index.vue'),
        meta: { title: 'Comparador' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
