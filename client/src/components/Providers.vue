<template>
  <div class="list">
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
            <router-link :to="{name: 'editProvider', params: { id: provider._id }}">Edit</router-link> | 
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
    this.$root.$on('providersListChanged', () => this.getProviders());
  },

  computed: {
    selected: {
      set: function(selected) {
        selected = selected || [];
        this.providers = this.providers.map(p => {
          if (selected.find(sel => sel._id === p._id)) {
            p.selected = true;
          } else {
            p.selected = false;
          }
          return p;
        });
      },
      get: function() {
        return this.providers.filter(p => p.selected === true);
      }
    }
  },

  methods: {
    async getProviders() {
      const response = await ProvidersService.fetchProviders();
      let selectedProviders = this.providers.filter(p => p.selected);
      this.providers = response.data;
      this.selected = selectedProviders;
    },
    deleteProvider(id) {
      ProvidersService.deleteProvider(id);
      this.$root.$emit('providersListChanged');
    }
  }
};
</script>