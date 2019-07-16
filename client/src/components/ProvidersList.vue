<template>
  <div class="list">
    <div class="table-wrap">
      <table class="wide">
        <tr>
          <td>Name</td>
          <td align="center">Actions</td>
        </tr>
        <tr v-for="provider in providerOptions" v-bind:key="provider._id">
          <td>
            <input  type="checkbox"
                    :checked="provider.selected"
                    :id="provider._id"
                    @change="toggleSelectedProvider(provider)">
            <label>{{ provider.name }}</label>
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
import EventBus from "../EventBus.js";

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
    EventBus.$on('providers-list-changed', () => {
      this.getProviders();
    });
  },
  computed: {
    providerOptions() {
      return this.providers.map(p => {
        const copy = { ...p };
        this.selectedProviders = this.selectedProviders || [];
        copy.selected = this.selectedProviders.includes(p._id);
        return copy;
      });
    }
  },
  methods: {
    async getProviders() {
      const response = await ProvidersService.fetchProviders();
      this.providers = response.data;
    },
    deleteProvider(id) {
      ProvidersService.deleteProvider(id);
      this.providers = this.providers.filter(p => p._id !== id);
      EventBus.$emit('providers-list-changed');
    },
    toggleSelectedProvider(provider) {
      EventBus.$emit('client-providers-changed', provider._id);
    }
  }
};
</script>