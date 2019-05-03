<template>
  <div class="clients">
    <h1>Add Client</h1>
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
          @provider-select-toggle="toggleSelectedProvider"
          @providers-list-changed="updateClientProviders"
          :selectedProviders="client.providers" />
      </div>
      <div class="row">
        <button class="add_btn" @click="submitForm">Add Client</button>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import ProvidersList from "@/components/ProvidersList";
import AddProvider from "@/components/AddProvider"

export default {
  name: "addClient",

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

    async submitForm () {
      await this.addClient(this.client);
    },

    async addClient(client) {
      await ClientsService.addClient({
        client: client
      });
      this.$router.push({ name: "clients" });
    }
  }
};
</script>