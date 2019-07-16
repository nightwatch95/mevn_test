<template>
  <div class="list">
    <div class="table-wrap">
      <h1>Clients</h1>
      <div v-if="clients.length > 0">
        <div>
          <router-link :to="{ name: 'addClient' }" class>Add client</router-link>
        </div>
        <table class="wide">
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Providers</td>
            <td align="center">Actions</td>
          </tr>
          <tr v-for="client in clients" v-bind:key="client._id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.providers.map(e => {
                  return e.name;
                }).join(', ')
              }}
            </td>
            <td align="center">
              <router-link :to="{name: 'editClient', params: { id: client._id }}">Edit</router-link> | 
              <a href="#" @click.prevent="deleteClient(client._id)">Delete</a>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        There are no clients.. Lets add one now
        <br>
        <br>
        <router-link :to="{ name: 'addClient' }" class="add_client_link">Add client</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsService from "@/services/ClientsService"
import ProviderService from "@/services/ProvidersService"

export default {
  name: "clients",

  data() {
    return {
      clients: [],
      providers: []
    };
  },
  mounted () {
    this.getClients();
    this.$root.$on('clientsListChanged', () => this.getClients());
  },
  methods: {
    async getClients () {
       let response = await ClientsService.fetchClients();
       this.clients = response.data;
    },

    deleteClient(id) {
      console.log(id);
      ClientsService.deleteClient(id);
      this.$root.$emit('clientsListChanged');
    }
  }
};
</script>

