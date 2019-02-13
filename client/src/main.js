import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import CreateClient from './components/clients/Create.vue'
import ClientsList from './components/clients/ClientsList.vue'
import EditClient from './components/clients/Edit.vue'
import CreateProvider from './components/providers/Create.vue'
import EditProvider from './components/providers/Edit.vue'
import ProvidersList from './components/providers/ProvidersList.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

const routes = [
  {
    name: 'createClient',
    path: '/createClient',
    component: CreateClient
  },
  {
    name: 'clients',
    path: '/',
    component: ClientsList
  },
  {
    name: 'editClient',
    path: '/editClient/:id',
    component: EditClient
  }, 
  {
    name: 'createProvider',
    path: '/createProvider',
    component: CreateProvider
  },
  {
    name: 'providers',
    path: '/providers',
    component: ProvidersList
  },
  {
    name: 'editProvider',
    path: '/editProvider',
    component : EditProvider
  },
  { 
    path: '/404', 
    component: NotFound
  },
  { 
    path: '*', 
    redirect: '/404' 
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');