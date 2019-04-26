<template>
  <div class="clients">
    <h1>Add Client</h1>
    <div class="form">
      <div class="row">
        <label for="name">Name:</label>
        <input id="name" type="text" class="text-input" placeholder="Name" v-model="client.name">
      </div>
      <div class="row">
        <label for="email">Email:</label>
        <input
          id="email"
          type="text"
          class="text-input"
          placeholder="somebox@gmail.com"
          v-model="client.email"
        >
      </div>
      <div class="row">
        <label for="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          class="text-input"
          placeholder="+1 234 456 78 90"
          v-model="client.phone"
        >
      </div>
      <div class="row">
        <label for="providers">Providers:</label>
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
    providerslist
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