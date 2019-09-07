<template>
  <div>
    <div class="form-check">
      <div v-for="provider in providers" v-bind:key="provider._id" class="form-row">
        <div v-if="providerForChange._id === provider._id">
          <form class="form-inline">
            <input type="text" class="form-control" v-model="providerForChange.name" />
            <button class="btn btn-primary mx-sm-3" @click="updateProvider()">Save</button>
          </form>
        </div>
        <div class="d-flex" v-else>
          <div class="p-2">
            <input
              class="form-check-input input-margin"
              v-bind:value="provider"
              v-model="selectedProviders"
              @change="toggleProvider(provider)"
              type="checkbox"
            />
            <label class="form-check-label label-margin">{{ provider.name }}</label>
          </div>
          <div class="ml-auto p-2">
            <a href="#" class="btn btn-link" @click="providerForChange = provider">Edit</a>
          </div>
          <div class="ml-auto p-2">
            <a href="#" class="btn btn-light" @click="deleteProvider(provider._id)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import ProvidersService from "@/services/ProvidersService";
import EventBus from "../EventBus.js";

export default {
  name: "providersList",

  props: ["clientProviders"],

  data() {
    return {
      providers: [],
      providerForChange: {},
      selectedProviders: []
    };
  },
  created: function() {
    this.getProviders();
  },
  mounted() {
    EventBus.$on("providers-list-changed", () => {
      this.getProviders();
    });
  },

  methods: {
    async getProviders() {
      const response = await ProvidersService.fetchProviders();
      this.providers = response.data;
    },
    async deleteProvider(id) {
      await ProvidersService.deleteProvider(id);
      this.getProviders();
    },
    toggleProvider(provider) {
      EventBus.$emit("client-providers-changed", this.selectedProviders);
    },

    async updateProvider() {
      await ProvidersService.updateProvider({
        id: this.providerForChange._id,
        provider: this.providerForChange
      });
      this.providerForChange = {};
    }
  },

  watch: {
    clientProviders: {
      deep: true,
      handler(newval, oldval) {
        this.selectedProviders = newval;
      }
    }
  }
};
</script>

<style>
.input-margin {
  margin-top: 13px;
}
.label-margin {
  margin-top: 7px;
}
</style>