<template>
  <form>
    <div v-if="errors.length" class="alert alert-danger" role="alert">
      <b>Please correct following errors:</b>
      <ul>
        <li :key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div class="form-group">
      <label>Name:</label>
      <input type="text" class="form-control" v-model="client.name" />
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="email" class="form-control" v-model="client.email" />
    </div>
    <div class="form-group">
      <label>Phone:</label>
      <input type="text" class="form-control" v-model="client.phone" />
    </div>
    <div class="form-group">
      <label>Providers:</label>
      <addProvider></addProvider>
    </div>
    <div class="form-group">
      <providersList :selectedProviders="client.providers"></providersList>
    </div>
  </form>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import ProvidersList from "@/components/ProvidersList";
import AddProvider from "@/components/AddProvider";
import EventBus from "../EventBus.js";

export default {
  name: "clientForm",

  components: {
    AddProvider,
    ProvidersList
  },

  props: {
    id: String
  },

  data() {
    return {
      errors: [],
      client: {
        name: "",
        email: "",
        phone: "",
        providers: []
      }
    };
  },

  mounted() {
    this.client._id = this.id;
    this.getClient();
    EventBus.$on("client-providers-changed", provider => {
      this.toggleSelectedProvider(provider);
    });
    EventBus.$on("providers-list-changed", providers => {
      this.updateClientProviders(providers);
    });
    EventBus.$on("add-client", () => {
      this.addClient(this.client);
    });
    EventBus.$on("update-client", () => {
      this.updateClient();
    });
  },

  methods: {
    toggleSelectedProvider(provider) {
      const isSelected = this.client.providers.includes(provider);
      if (isSelected) {
        this.client.providers = this.client.providers.filter(
          p => p._id !== provider._id
        );
      } else {
        this.client.providers.push(provider);
      }
    },

    updateClientProviders(providers) {
      this.client.providers = this.client.providers.filter(pId =>
        providers.find(p => p._id === pId)
      );
    },

    async getClient() {
      const response = await ClientsService.getClient({
        id: this.client._id
      });
      this.client.name = response.data.name;
      this.client.email = response.data.email;
      this.client.phone = response.data.phone;
      this.client.providers = response.data.providers;
    },

    checkForm() {
      this.errors = [];
      
      if (!this.client.name) {
        this.errors.push('Name is required');
      }
      if (!this.client.email || !this.validEmail(this.client.email)) {
        this.errors.push('Email is required and must be valid');
      }
      if (!this.client.phone || this.client.phone.length < 8){
        this.errors.push('Phone is required and must be valid');
      }
      if (!this.errors.length) {
        return true;
      }
    },

    validEmail(email) {
      var pattern = /\S+@\S+\.\S+/;
      return pattern.test(email);
    },

    async addClient(client) {
      if (this.checkForm()) {
        var response = await ClientsService.addClient({
          client: client
        });
        // if (response.errors !== {} && response.message !== "")
        //   this.errors.push(response.message);
        EventBus.$emit("close-modal");
        EventBus.$emit("clients-list-changed");
      }
    },

    async updateClient() {
      if (this.checkForm()) {
        await ClientsService.updateClient({
          id: this.client._id,
          client: this.client
        });
        EventBus.$emit("close-modal");
        EventBus.$emit("clients-list-changed");
      }
    } 
  }
};
</script>
