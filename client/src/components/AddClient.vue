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
        <providerslist ref="providersList"></providerslist>
      </div>
      <div>
        <button class="add_btn" @click="addClient">Add Client</button>
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
      client: {}
    };
  },
  components: {
    providerslist
  },
  methods: {
    setData (client) {
      this.client.providerslist
    },

    async submitForm () {
      this.client.providers = this.$refs.providerslist.selected.map(p => p._id);
      addClient();
    },
    async addClient(client) {  
      await ClientsService.addClient({
        client: this.client
      });
      this.$router.push({ name: "clients" });
    }
  }
};
</script>

<style type="text/css">
.form {
  display: inline-block;
}
.text-input {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.row {
  margin: 20px;
}
.add_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 260px;
  border: none;
  cursor: pointer;
}
label {
  display: inline-block;
  text-align: right;
  width: 80px;
  margin: 0 20px 0 0;
}
</style>
