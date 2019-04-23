<template>
  <div class="clients">
    <h1>Edit Client</h1>
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
          @provider-list-changed="updateProviders"
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
import providerslist from "@/components/Providers";

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
    providerslist
  },

  mounted () {
    this.getClient();
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

    updateProviders(providers) {
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
      console.log("getClient");
      this.client.providers = response.data.providers;
    },

    async updateClient() {
      await ClientsService.updateClient({
        id: this.$route.params.id,
        client: this.client
      });
      this.$route.push({ name: "/" });
    }
  }
};
</script>