import Api from '@/services/Api'

export default {
  fetchProviders () {
    return Api().get('providers');
  },

  addProvider (params) {
    return Api().post('add_provider', params);
  },

  updateProvider (params) {
    return Api().put('providers/' + params.id, params);
  },

  getProvider(params) {
	return Api().get('provider/' + params.id);
  },

  deleteProvider (id) {
    return Api().delete('providers/' + id);
  }
}
