<template>
  <div class="clients">
    <h1>Add Client</h1>
    <div class="form">
      <div class="row">
        <label>Name:</label>
        <input type="text" class="text-input" v-model="client.name"/>
      </div>
      <div class="row">
        <label>Email:</label>
        <input type="text" class="text-input" v-model="client.email"/>
      </div>
      <div class="row">
        <label>Phone:</label>
        <input type="text" class="text-input" v-model="client.phone"/>
      </div>
      <div class="row">
        <label>Providers:</label>
        <addProvider></addProvider>
      </div>
      <div class="row">
        <providerslist 
          @provider-select-toggle="toggleSelectedProvider"
          :selectedProviders="[]" />
      </div>
      <div class="row">
        <button class="add_btn" @click="submitForm">Add Client</button>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import providerslist from "@/components/Providers";
import addProvider from "@/components/AddProvider"

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
    providerslist,
    addProvider
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

    async submitForm () {
      let client = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.$refs.providersList.selected.map(p => p._id)
      };
      await this.addClient(client);
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