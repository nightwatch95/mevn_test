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
      <providersList :clientProviders="client.providers"></providersList>
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
        name: '',
        email: '',
        phone: '',
        providers: []
      }
    };
  },

  mounted() {
    this.getClient(this.$props.id);
    EventBus.$on("client-providers-changed", (providers) => {
      this.client.providers = providers;
    });
    EventBus.$on("add-client", () => {
      this.addClient(this.client);
    });
    EventBus.$on("update-client", () => {
      this.updateClient(this.client);
    });
  },
  
  beforeDestroy() {
      EventBus.$off('update-client');
      EventBus.$off('add-client');
  },

  methods: {
    checkForm() {
      this.errors = [];
      
      if (!this.client.name) {
        this.errors.push('Name is required');
      }
      if (!this.client.email || !this.validEmail(this.client.email)) {
        this.errors.push('Email is required and must be valid');
      }
      if (!this.client.phone || this.client.phone.length < 8){
        this.errors.push('Phone is required and must contain at least 8 characters');
      }
      if (!this.errors.length) {
        return true;
      }
    },
    
    validEmail(email) {
      var pattern = /\S+@\S+\.\S+/;
      return pattern.test(email);
    },

    async getClient(clientId) {
      if (clientId != null)
      {
        const response = await ClientsService.getClient({
          id: clientId
        });
        this.client = response.data;
      }
    },

    async addClient(client) {
      if (this.checkForm()) {
        var response = await ClientsService.addClient({
          client: client
        });
        this.client = {};
        EventBus.$emit("close-modal");
        EventBus.$emit("clients-list-changed");
      }
    },

    async updateClient(client) {
      if (this.checkForm()) {
        await ClientsService.updateClient({
          id: client._id,
          client: client
        });
        this.client = {};
        EventBus.$emit("close-modal");
        EventBus.$emit("clients-list-changed");
      }
    } 
  }
};
</script>
