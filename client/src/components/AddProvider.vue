<template>
  <div class="providers">
    <div class="form">
      <div class="row">
        <input type="text" class="text-input" v-model="provider.name">
        <button class="add_btn" @click="addProvider">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProvidersService from "@/services/ProvidersService";
import EventBus from "../EventBus.js";

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
      EventBus.$emit('providers-list-changed');
    }
  }
};
</script>
