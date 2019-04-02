<template>
  <div class="providers">
    <div class="table-wrap">
      <div>
        <router-link :to="{ name: 'addProvider' }" class>Add provider</router-link>
      </div>
      <table>
        <tr>
          <td>Name</td>
          <td align="center">Actions</td>
        </tr>
        <tr v-for="provider in providers" v-bind:key="provider._id">
          <!-- <b-form-checkbox v-model="data.item.selected"
						:value=true
						:unchecked-value=false
						:id="data.item._id">
					{{ data.item.name }}
          </b-form-checkbox>-->
          <td>
            <input
              v-model="toggle"
              true-value="true"
              false-value="false"
              value="true"
              type="checkbox"
            >
            <label for="provider._id">{{ provider.name }}</label>
          </td>
          <td align="center">
            <router-link :to="{name: 'editProvider', params: { id: provider._id }}">Edit</router-link>|
            <a href="#" @click.prevent="deleteProvider(provider._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ProvidersService from "@/services/ProvidersService";

export default {
  name: "providersList",

  data() {
    return {
      providers: []
    };
  },

  mounted() {
    this.getProviders();
  },

  methods: {
    async getProviders() {
      const response = await ProvidersService.fetchProviders();
      this.providers = response.data;
    },
    async deleteProvider(id) {
      ProvidersService.deleteProvider(id);
      this.$router.go({
        path: "providers"
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
a.add_provider_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
.providers {
  display: inline-block;
  text-align: center;
  width: 500px;
}
</style>
