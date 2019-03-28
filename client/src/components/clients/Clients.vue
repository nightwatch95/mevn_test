<template>
  <div class="container">
      <h1>Clients</h1>
	  <div v-if="clients.length > 0" class="table-wrap">
		<div class="row">
			<div class="col-md-2">
				<router-link :to="{ name: 'addClient' }" class="btn btn-primary">Add client</router-link>
			</div>
        </div><br />
        <table class="table table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Providers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients" v-bind:key="client._id">
                  <td>{{ client.name }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ client.phone }}</td>
                  <td>
                    <span v-for="provider in client.providers" v-bind:key="provider.id">
                      {{ provider.name }}
                    </span>
                  </td>
                  <td>
					  <router-link :to="{name: 'editClient', params: { id: client._id }}" class="btn btn-primary">Edit</router-link>
					  <button class="btn btn-danger" @click.prevent="deleteClient(client._id)">Delete</button>
				  </td>
                </tr>
            </tbody>
        </table>
	  </div>
	  <div v-else>
		There are no clients.. Lets add one now <br /><br />
		<router-link :to="{ name: 'addClient' }">Add client</router-link>
	  </div>

  </div>
</template>

<script>
  export default {
    name: 'clients',

    data() {
      return {
        clients: []
      };
    },
    created() {
      let uri = 'http://localhost:4000/clients';
      this.axios.get(uri).then(response => {
        this.clients = response.data;
      });
    },
    methods: {
      deleteClient(id) {
        let uri = `http://localhost:4000/clients/delete/${id}`;
        this.axios.delete(uri).then(response => {
          this.clients.splice(this.clients.indexOf(id), 1);
        });
      }
    }
  };
</script>

<style type="text/css">
	.container {
		width: 70%;
    	margin-left: auto;
    	margin-right: auto;
	}
</style>
