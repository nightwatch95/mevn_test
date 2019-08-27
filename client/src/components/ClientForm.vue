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
    EventBus.$on("client-providers-changed", providerId => {
      this.toggleSelectedProvider(providerId);
    });
    EventBus.$on("providers-list-changed", providers => {
      updateClientProviders(providers);
    });
    EventBus.$on("add-client", () => {
      this.addClient(this.client);
    });
    EventBus.$on("update-client", () => {
      this.updateClient();
    });
  },

  methods: {
    toggleSelectedProvider(providerId) {
      const isSelected = this.client.providers.includes(providerId);
      if (isSelected) {
        this.client.providers = this.client.providers.filter(
          p => p !== providerId
        );
      } else {
        this.client.providers.push(providerId);
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
      if (!this.client.email || !this.client.email.includes('@')) {
        this.errors.push('Email is required and must be valid');
      }
      if (!this.client.phone || !this.client.phone.length < 8)
      {
        this.errors.push('Phone is required and must be valid');
      }
      console.log(errors.length);
      if (!this.errors.length) {
        return true;
      }
    },

    async addClient(client) {
      if (this.checkForm()) {
        await ClientsService.addClient({
          client: client
        });
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