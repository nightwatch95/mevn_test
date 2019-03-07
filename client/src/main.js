import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import AddClient from './components/clients/Create.vue'
import Clients from './components/clients/Clients.vue'
import EditClient from './components/clients/Edit.vue'
import AddProvider from './components/providers/AddProvider.vue'
import EditProvider from './components/providers/Edit.vue'
import ProvidersList from './components/providers/ProvidersList.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.component('addClient', AddClient)
Vue.component('clients', Clients)
Vue.component('editClient', EditClient)
Vue.component('addProvider', AddProvider)
Vue.component('editProvider', EditProvider)
Vue.component('providersList', ProvidersList)
Vue.component('notFound', NotFound)

Vue.config.productionTip = false

const routes = [
  {
    name: 'addClient',
    path: '/addClient',
    component: AddClient
  },
  {
    name: 'clients',
    path: '/',
    component: Clients
  },
  {
    name: 'editClient',
    path: '/editClient/:id',
    component: EditClient
  }, 
  {
    name: 'addProvider',
    path: '/addProvider',
    component: AddProvider
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