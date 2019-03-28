<template>
  <div class="container">
        <b-table striped
				 hover
				 bordered
				 small
				 :items='providers'
				 :fields='fields'>
            <template slot="name" slot-scope="data" width="300">
              <b-form-checkbox v-model="data.item.selected"
                              :value=true
                              :unchecked-value=false
                              :id="data.item._id">
                {{ data.item.name }}
              </b-form-checkbox>
            </template>
            <template slot="actions" slot-scope="data">
              <!-- <router-link :to="{ name: 'editProvider', params: { id: data.item._id} }" size="sm" class="btn btn-success">Edit</router-link> -->
              <b-btn size="sm" variant="outline-primary" @click="editProvider(data.item)">Edit</b-btn>
			  <b-btn size="sm" variant="danger" @click="deleteProvider(data.item._id)">Delete</b-btn>
            </template>
        </b-table>
		<router-link :to="{ name: 'addProvider' }" class="link ">Add provider</router-link>
  </div>
</template>

<script>
import ProvidersService from '@/services/ProvidersService'

export default {
    name: 'providersList',

    data() {
      return {
         providers: [],
         fields: [ 'name', 'actions' ]
      };
    },

    created() {
      let uri = 'http://localhost:4000/providers';
      this.axios.get(uri).then(response => {
        this.providers = response.data;
      });
    },

    methods: {
      deleteProvider(id) {
        let uri = `http://localhost:4000/providers/delete/${id}`;
        this.axios.delete(uri).then(response => {
          this.providers.splice(this.providers.indexOf(id), 1);
        });
      }
    }
};
</script>

<style type="text/css">
	.link {
		display: block;
		text-align: left;
	}
</style>
