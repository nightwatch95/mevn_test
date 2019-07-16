<template>
  <div class="clients">
    <h1>Edit Client</h1>
    <div class="form">
      <div class="row">
        <label>Name:</label>
        <input type="text" class="text-input" v-model="client.name">
      </div>
      <div class="row">
        <label>Email:</label>
        <input type="text" class="text-input" v-model="client.email">
      </div>
      <div class="row">
        <label>Phone:</label>
        <input type="text" class="text-input" v-model="client.phone">
      </div>
      <div class="row">
        <label>Providers:</label>
        <addProvider></addProvider>
      </div>
      <div class="row">
        <providersList
          @providers-list-changed="updateClientProviders"
          :selectedProviders="client.providers" />
      </div>
      <div class="row">
        <button class="add_btn" @click="updateClient">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import ProvidersList from "@/components/ProvidersList";
import AddProvider from "@/components/AddProvider";
import EventBus from "../EventBus.js";

export default {
  name: "editClient",
  
  data() {
    return {
      client: {
        name: '',
        email: '',
        phone: '',
        providers: []
      }
    };
  },

  components: {
    ProvidersList,
    AddProvider
  },

  mounted () {
    this.getClient();
    EventBus.$on('client-providers-changed', providerId => {
      this.toggleSelectedProvider(providerId);
    });
  },

  created () {

  },

  methods: {
    toggleSelectedProvider(providerId) {
      const isSelected = this.client.providers.includes(providerId);
      if (isSelected) {
        this.client.providers = this.client.providers.filter(p => p !== providerId);
      } else {
        this.client.providers.push(providerId);
      }
    },

    updateClientProviders(providers) {
      this.client.providers = this.client.providers
        .filter(pId => providers.find(p => p._id === pId));
    },

    async getClient () {
      const response = await ClientsService.getClient({
        id: this.$route.params.id
      });
      this.client.name = response.data.name;
      this.client.email = response.data.email;
      this.client.phone = response.data.phone;
      this.client.providers = response.data.providers;
    },

    async updateClient() {
      await ClientsService.updateClient({
        id: this.$route.params.id,
        client: this.client
      });
    }
  }
};
</script>