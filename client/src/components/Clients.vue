<template>
  <div class="container">
    <div class="row row-margin">
      <h3 class="col">Clients</h3>
      <button
        v-on:click="showModal(null)"
        type="button"
        class="btn btn-primary col-md-auto">New Client</button>
    </div>
    <div class="row row-margin">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Providers</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" v-bind:key="client._id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              {{ client.providers.map(e => {
                  return e.name;
                })
                .join(', ')
              }}
            </td>
            <td>
              <a href="#" v-on:click="showModal(client._id)">Edit</a> |
              <a href="#" v-on:click="deleteClient(client._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import EventBus from "../EventBus.js";

export default {
  name: "clients",

  data() {
    return {
      clients: []
    };
  },
  created() {
    this.getClients();
  },
  mounted() {
    EventBus.$on("clients-list-changed", this.getClients());
  },
  methods: {
    showModal(id) {
      EventBus.$emit("show-modal", id);
    },
    
    async getClients() {
      let response = await ClientsService.fetchClients();
      this.clients = response.data;
    },

    async deleteClient(id) {
      await ClientsService.deleteClient(id);
      this.getClients();
    }
  }
};
</script>

<style>
.row-margin {
  margin-top: 20px;
}
</style>
