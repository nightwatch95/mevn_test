<template>
  <div class="providers">
    <div class="table-wrap">
      <div>
        <router-link :to="{ name: 'addProvider' }" class>Add provider</router-link>
      </div>
      <table class="wide">
        <tr>
          <td>Name</td>
          <td align="center">Actions</td>
        </tr>
        <tr v-for="provider in providers" v-bind:key="provider._id">
          <td>
            <b-form-checkbox
              v-model="provider.selected"
              :value="true"
              :unchecked-value="false"
              :id="provider._id + '_name'"
            >{{ provider.name }}</b-form-checkbox>
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
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

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
.providers {
  display: inline-block;
  text-align: center;
  width: 525px;
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
</style>
