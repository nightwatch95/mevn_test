<template>
  <form class="form-inline">
    <div class="form-group">
      <input type="text" class="form-control" v-model="provider.name">
    </div>
    <button class="btn btn-primary mx-sm-3" @click="addProvider">Add</button>
  </form>
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
      this.provider = {};
    }
  }
};
</script>
