<template>
  <form>
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
      <providersList></providersList>
    </div>
  </form>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import ProvidersList from "@/components/ProvidersList";
import AddProvider from "@/components/AddProvider"
import EventBus from "../EventBus.js";

export default {
  name: "addClient",

  components: {
    ProvidersList,
    AddProvider
  },

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

  mounted() {
    EventBus.$on('add-client', () => {
      this.addClient(this.client);
    });
    EventBus.$on("client-providers-changed", (providerId) => {
      this.toggleSelectedProvider(providerId);
    });
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

    async addClient(client) {
      await ClientsService.addClient({
        client: client
      });
      EventBus.$emit('close-modal');
      EventBus.$emit('clients-list-changed');
    }
  }
};
</script>