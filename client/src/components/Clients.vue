<template>
  <div class="posts">
    <h1>Clients</h1>
    <div v-if="clients.length > 0" class="table-wrap">
      <div>
        <router-link :to="{ name: 'addClient' }" class>Add client</router-link>
      </div>
      <table>
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
            <router-link :to="{name: 'editClient', params: { id: client._id }}">Edit</router-link>
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
</template>

<script>
export default {
  name: "clients",

  data() {
    return {
      clients: []
    };
  },
  created() {
    let uri = "http://localhost:4000/clients";
    this.axios.get(uri).then(response => {
      this.clients = response.data;
    });
  },
  methods: {
    deleteClient(id) {
      let uri = `http://localhost:4000/clients/delete/${id}`;
      this.axios.delete(uri).then(() => {
        this.clients.splice(this.clients.indexOf(id), 1);
      });
    }
  }
};
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
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
