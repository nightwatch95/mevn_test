import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
//import VueRouter from 'vue-router'
import router from './router'

// Vue.use(VueRouter);
Vue.use(VueAxios, axios);
// Vue.use(BootstrapVue);

Vue.config.productionTip = false

//new Vue(Vue.util.extend({ router }, App)).$mount('#app');

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(App),
	router,
	template: '<App/>',
	components: { App }
  })
