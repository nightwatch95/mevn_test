<template>
  <div class="providers">
    <h1>Add Provider</h1>
    <div class="form">
      <div class="row">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="title"
          class="text-input"
          placeholder="NAME"
          v-model="provider.name"
        >
      </div>
      <div>
        <button class="add_btn" @click="addProvider">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProvidersService from "@/services/ProvidersService";
export default {
  name: "addProvider",
  data() {
    return {
      provider: {}
    };
  },
  methods: {
    async addProvider() {
      await ProvidersService.addProvider({
        provider: this.provider
      });
      this.$router.push({ name: "providers" });
    }
  }
};
</script>
