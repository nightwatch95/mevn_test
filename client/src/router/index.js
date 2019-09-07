import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/components/Clients.vue'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			name: 'clients',
			path: '/',
			component: Clients
		}
	]
})