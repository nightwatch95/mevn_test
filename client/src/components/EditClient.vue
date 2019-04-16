<template>
  <div class="clients">
    <h1>Edit Client</h1>
    <div class="form">
      <div class="row">
        <label for="name">Name:</label>
        <input id="name" type="text" class="text-input" placeholder="Name" v-model="name">
      </div>
      <div class="row">
        <label for="email">Email:</label>
        <input
          id="email"
          type="text"
          class="text-input"
          placeholder="somebox@gmail.com"
          v-model="email"
        >
      </div>
      <div class="row">
        <label for="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          class="text-input"
          placeholder="+1 234 456 78 90"
          v-model="phone"
        >
      </div>
      <div class="row">
        <label for="providers">Providers:</label>
        <providerslist ref="providersList"></providerslist>
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
      name: '',
      email: '',
      phone: ''
    };
  },

  components: {
    providerslist
  },

  mounted () {
    let client = this.getClient();
    console.log("client: ", client);
    this.setData(client);
  },

  methods: {
    async getClient () {
      const response = await ClientsService.getClient({
        id: this.$route.params.id
      });
      return response.data;
    },

    setData(client) {
      this.name = client.name;
      this.email = client.email;
      this.phone = client.phone;
      this.$refs.providerslist.selected = client.providerslist;
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
