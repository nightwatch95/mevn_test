<template>
  <div class="clients">
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
            <td>
              <span v-for="provider in client.providers" v-bind:key="provider.id">{{ provider.name }}</span>
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
      clients: []
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

<style type="text/css">
.clients {
  display: inline-block;
  text-align: center;
  width: 500px;
}

table label {
  display: inline-block;
  text-align: left;
}
table input {
  display: inline-block;
  width: auto;
}
table.wide {
  width: 100%;
}
.label-left-margin {
  margin-left: 15px;
}

.table-wrap {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
table th,
table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_client_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
