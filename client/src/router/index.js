import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/components/Clients.vue'
import AddProvider from '@/components/AddProvider.vue'
import EditProvider from '@/components/EditProvider.vue'
import ProvidersList from '@/components/ProvidersList.vue'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			name: 'clients',
			path: '/',
			component: Clients
		},
		{
			name: 'addProvider',
			path: '/providers/add',
			component: AddProvider
		},
		{
			name: 'providersList',
			path: '/providers',
			component: ProvidersList
		},
		{
			name: 'editProvider',
			path: '/providers/:id/edit',
			component: EditProvider
		}
	]
})