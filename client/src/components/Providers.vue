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
        <tr v-for="provider in providerOptions" v-bind:key="provider._id">
          <td>
            {{ provider.selected }}
            <b-form-checkbox
              :checked="provider.selected"
              @change="toggleSelectedProvider(provider)"
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

  props: {
    selectedProviders: Array
  },

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
    providerOptions() {
      return this.providers.map(p => {
        const copy = { ...p };
        //console.log("selectedProviders", this.selectedProviders);
        copy.selected = this.selectedProviders.includes(p._id);
        return copy;
      });
    }
  },

  methods: {
    toggleSelectedProvider(provider) {
      this.$emit('provider-select-toggle', provider._id);
    },
    async getProviders() {
      const response = await ProvidersService.fetchProviders();
      this.providers = response.data;
    },
    deleteProvider(id) {
      ProvidersService.deleteProvider(id);
      this.providers = this.providers.filter(p => p._id !== id);
      this.$emit('providers-list-changed', this.providers);
    }
  }
};
</script>