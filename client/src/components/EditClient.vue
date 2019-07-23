<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Client</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label>Name:</label>
                    <input type="text" class="form-control" v-model="client.name">
                  </div>
                  <div class="form-group">
                    <label>Email:</label>
                    <input type="email" class="form-control" v-model="client.email">
                  </div>
                  <div class="form-group">
                    <label>Phone:</label>
                    <input type="text" class="form-control" v-model="client.phone">
                  </div>
                  <div class="form-group">
                    <label>Providers:</label>
                    <addProvider></addProvider>
                  </div>
                  <div class="form-group">
                    <providersList
                      @provider-select-toggle="toggleSelectedProvider"
                      @providers-list-changed="updateClientProviders"
                      :selectedProviders="client.providers" />
                  </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="updateClient">Save</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- <div class="clients">
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
          @provider-select-toggle="toggleSelectedProvider"
          @providers-list-changed="updateClientProviders"
          :selectedProviders="client.providers" />
      </div>
      <div class="row">
        <button class="add_btn" @click="updateClient">Update</button>
      </div>
    </div>
  </div> -->
</template>

<script>
import ClientsService from "@/services/ClientsService";
import EventBus from '../EventBus.js';

export default {
  name: "editClient",
  
  data() {
    return {
      client: {
        name: '',
        email: '',
        phone: '',
        providers: []
      },
      showModal: false
    };
  },

  mounted () {
    EventBus.$on("show-modal", (id) => {
      console.log("show-modal catched");
      this.client._id = id;
      this.showModal = true;
    });
    EventBus.$on("close-modal", () => {
      this.showModal = false;
    });
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