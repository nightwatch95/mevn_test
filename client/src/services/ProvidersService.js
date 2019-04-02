import Api from '@/services/Api'

export default {
	fetchProviders() {
		return Api().get('providers');
	},

	addProvider(params) {
		return Api().post('providers/add', params);
	},

	getProvider(params) {
		return Api().get('providers/' + params.id);
	},

	updateProvider(params) {
		return Api().put('providers/' + params.id, params);
	},

	deleteProvider(id) {
		return Api().delete('providers/' + id);
	}
}
