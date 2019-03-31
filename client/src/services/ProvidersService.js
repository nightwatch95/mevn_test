import Api from '@/services/Api'

export default {
  fetchProviders () {
    return Api().get('providers');
  },

  addProvider (params) {
    return Api().post('providers/add', params);
  },

  updateProvider (params) {
    return Api().put('providers/' + params.id, params);
  },

  deleteProvider (id) {
    return Api().delete('providers/' + id);
  }
}
