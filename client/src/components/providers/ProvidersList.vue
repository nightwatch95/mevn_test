<template>
  <div>
        <b-table striped hover bordered :items='providers' :fields='fields'>
            <template slot="name" slot-scope="data" width="300">
              <b-form-checkbox v-model="data.item.selected"
                              :value=true
                              :unchecked-value=false
                              :id="data.item._id">
                {{ data.item.name }}
              </b-form-checkbox>
            </template>
            <template slot="actions" slot-scope="data">
              <b-btn size="sm" class="btn btn-success" @click="editProvider(data.item)">Edit</b-btn>
              <b-btn size="sm" class="btn btn-danger" @click="deleteProvider(data.item._id)">Delete</b-btn>
            </template>
        </b-table>
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
      editProvider(provider) {
        
      },

      deleteProvider(id) {
        let uri = `http://localhost:4000/providers/delete/${id}`;
        this.axios.delete(uri).then(response => {
          this.providers.splice(this.providers.indexOf(id), 1);
        });
      }
    }
};
</script>