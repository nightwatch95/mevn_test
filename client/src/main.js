import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(App),
	router,
	template: '<App/>',
	components: {
		App
	}
})
