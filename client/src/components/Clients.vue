<template>
  <div class="container">
    <div class="row row-margin">
      <h3 class="col">Clients</h3>
      <button type="button" class="btn btn-primary col-md-auto">New Client</button>
    </div>
    <div class="row row-margin">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Providers</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="client in clients" v-bind:key="client._id">
                <td>{{ client.name }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.phone }}</td>
                <td>{{ client.providers.map(e => {
                      return e.name;
                    }).join(', ')
                  }}
                </td>
                <td>
                  <a href="#" @click.prevent="showModal(client._id)">Edit</a> |
                  <!-- <router-link :to="{name: 'editClient', params: { id: client._id }}">Edit</router-link> |  -->
                  <a href="#" @click.prevent="deleteClient(client._id)">Delete</a>
                </td>
              </tr>
          </tbody>
        </table>
    </div>
    
  </div>
  <!-- <div class="list">
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
  </div> -->
</template>

<script>
import ClientsService from "@/services/ClientsService"
import EventBus from "../EventBus.js";

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
    showModal(id) {
      console.log("show-modal emitted");
      EventBus.$emit('show-modal', id);
    },

    async getClients () {
       let response = await ClientsService.fetchClients();
       this.clients = response.data;
    },

    deleteClient(id) {
      ClientsService.deleteClient(id);
      this.$root.$emit('clientsListChanged');
    }
  }
};
</script>

<style>
.row-margin {
  margin-top: 20px;
}
</style>
