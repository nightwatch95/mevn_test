import Vue from 'vue'
import Router from 'vue-router'
import ClientForm from '@/components/ClientForm.vue'
import Clients from '@/components/Clients.vue'
import AddProvider from '@/components/AddProvider.vue'
import EditProvider from '@/components/EditProvider.vue'
import ProvidersList from '@/components/ProvidersList.vue'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			name: 'clientForm',
			path: '/',
			component: ClientForm
		},
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