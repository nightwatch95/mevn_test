import Api from '@/services/Api'

export default {
  fetchClients () {
    return Api().get('clients')
  },

  addClient (params) {
    return Api().post('clients/add', params)
  },

  updateClient (params) {
    return Api().put('clients/' + params.id, params)
  },

  deleteClient (params) {
    return Api().delete('clients/' + params.id)
  }
}
