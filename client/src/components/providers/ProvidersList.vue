<template>
  <div>
        <b-table>
            <span>Hello from providers table</span>
            <!-- <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="provider in providers" :key="provider._id">
                  <td>{{ provider._id }}</td>
                  <td>{{ provider.name }}</td>
                  <td><router-link :to="{name: 'editProvider', params: { id: provider._id }}" class="btn btn-primary">Edit</router-link></td>
                  <td><button class="btn btn-danger" @click.prevent="deleteProvider(provider._id)">Delete</button></td>
                </tr>
            </tbody> -->
        </b-table>
  </div>
</template>

<script>
  export default {
    name: 'providersList',

    // data() {
    //   return {
    //     providers: [],
    //     fields: [ 'name', 'actions' ]
    //   };
    // },

    // mounted () {
    //   this.getProviders()
    //   this.$root.$on('providersListChanged', () => this.getProviders())
    // },

    // created() {
    //   let uri = 'http://localhost:4000/providers';
    //   this.axios.get(uri).then(response => {
    //     this.providers = response.data;
    //   });
    // },
    // methods: {
    //   deleteProvider(id) {
    //     let uri = `http://localhost:4000/providers/delete/${id}`;
    //     this.axios.delete(uri).then(response => {
    //       this.providers.splice(this.providers.indexOf(id), 1);
    //     });
    //   }
    // }
  };
</script>