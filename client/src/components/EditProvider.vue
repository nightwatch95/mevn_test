<template>
  <div class="providers">
    <h1>Edit Provider</h1>
    <div class="form">
      <div class="row">
        <label for="name">Name:</label>
        <input id="name" type="text" class="text-input" v-model="provider.name">
      </div>
      <div>
        <button class="add_btn" @click="updateProvider">Update</button>
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
