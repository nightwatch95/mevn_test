<template>
  <div class="providers">
    <h1>Edit Provider</h1>
    <div class="form">
      <div>
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="provider.name">
      </div>
      <div>
        <button class="app_provider_btn" @click="updateProvider">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProvidersService from "@/services/ProvidersService";
export default {
  name: "editProvider",

  data() {
    return {
      provider: {}
    };
  },

  mounted() {
    this.getProvider();
  },

  methods: {
    async getProvider() {
      const response = await ProvidersService.getProvider({
        id: this.$route.params.id
      });
      this.provider = response.data;
      console.log(this.provider);
    },
    async updateProvider() {
      await ProvidersService.updateProvider({
        id: this.$route.params.id,
        provider: this.provider
      });
      this.$router.push({ name: "providers" });
    }
  }
};
</script>

<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_provider_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 207px;
  border: none;
  cursor: pointer;
}
label {
  display: inline-block;
  text-align: left;
  width: 80px;
}
</style>
