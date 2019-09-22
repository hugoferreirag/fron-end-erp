import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "about" */ './components/Auth/Auth.vue'),
      props: true
    },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './components/Home/Home.vue'),
      props: true
    },
    {
      path: '/hierarquia',
      name: 'hierarquia',
      component: () => import(/* webpackChunkName: "about" */ './components/Hierarquia/Hierarquia.vue'),
      props: true
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import(/* webpackChunkName: "about" */ './components/Clientes/Clientes.vue'),
      props: true
    },
    {
      path: '/fornecedores',
      name: 'fornecedores',
      component: () => import(/* webpackChunkName: "about" */ './components/Fornecedores/Fornecedores.vue'),
      props: true
    },
    {
      path: '/categoria/arma',
      name: 'categoriaArma',
      component: () => import(/* webpackChunkName: "about" */ './components/Categorias/Arma.vue'),
      props: true
    },
    {
      path: '/categoria/acessorio',
      name: 'categoriaAcessorio',
      component: () => import(/* webpackChunkName: "about" */ './components/Categorias/Acessorio.vue'),
      props: true
    },
    {
      path: '/categoria/acessorio',
      name: 'categoriaAcessorio',
      component: () => import(/* webpackChunkName: "about" */ './components/Categorias/Acessorio.vue'),
      props: true
    },
    {
      path: '/inventario/arma',
      name: 'inventarioAcessorio',
      component: () => import(/* webpackChunkName: "about" */ './components/Inventario/Arma.vue'),
      props: true
    },
    {
      path: '/inventario/municao',
      name: 'inventarioMunicao',
      component: () => import(/* webpackChunkName: "about" */ './components/Inventario/Municao.vue'),
      props: true
    },
    {
      path: '/inventario/estoque',
      name: 'inventarioMunicaoStock',
      component: () => import(/* webpackChunkName: "about" */ './components/Inventario/MunicaoStock.vue'),
      props: true
    },
    {
      path: '/inventario/boxunity',
      name: 'inventarioMunicaoVena',
      component: () => import(/* webpackChunkName: "about" */ './components/Inventario/MunicaoModel.vue'),
      props: true
    },
    {
      path: '/inventario/acessorio',
      name: 'inventarioAcessorio',
      component: () => import(/* webpackChunkName: "about" */ './components/Inventario/Acessorio.vue'),
      props: true
    },
    {
      path: '/fornecedores/:id',
      name: 'fornecedores',
      component: () => import(/* webpackChunkName: "about" */ './components/Fornecedores/InfoFornecedor.vue'),
      props: true
    },
    {
      path: '/hierarquia/:id',
      name: 'infoUser',
      component: () => import(/* webpackChunkName: "about" */ './components/Hierarquia/InfoUser.vue'),
      props: true
    },
  ]
})
