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
      <providersList :selectedProviders="client.providers"></providersList>
    </div>
  </form>
</template>

<script>
import ClientsService from "@/services/ClientsService";
import AddProvider from "@/components/AddProvider";
import ProvidersList from "@/components/ProvidersList";
import EventBus from "../EventBus.js";

export default {
  name: "editClient",

  components: {
    AddProvider,
    ProvidersList
  },

  props: {
    id: String
  },

  data() {
    return {
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
    EventBus.$on('update-client', () => {
      this.updateClient()
    });
    EventBus.$on("client-providers-changed", (providerId) => {
      this.toggleSelectedProvider(providerId);
    });
    EventBus.$on("providers-list-changed", (providers) => {
      updateClientProviders(providers);
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

    async updateClient() {
      await ClientsService.updateClient({
        id: this.client._id,
        client: this.client
      });
      EventBus.$emit('close-modal');
      EventBus.$emit('clients-list-changed');
    }
  }
};
</script>