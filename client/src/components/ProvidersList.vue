<template>
  <div>
    <div class="form-check">
      <div v-for="provider in providers" v-bind:key="provider._id" class="form-row">
        <!-- <div v-if="providerForChange._id === provider._id">
          <form class="form-inline">
            <input type="text" v-model="providerForChange.name">
            <button class="btn btn-primary mx-sm-3" @click="updateProvider()">Save</button>
          </form>
        </div> -->
        <div class="d-flex">
          <div class="p-2">
            <input class="form-check-input input-margin" 
                  type="checkbox"
                  value
                  :checked="provider.selected"
                  :id="provider._id"
                  @change="toggleSelectedProvider(provider)"/>
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
import "bootstrap-vue/dist/bootstrap-vue.css";
import ProvidersService from "@/services/ProvidersService";
import EventBus from "../EventBus.js";

export default {
  name: "providersList",
  props: {
    selectedProviders: Array
  },
  data() {
    return {
      providers: [],
      //providerForChange: {}
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

  // computed: {
  //   providerOptions() {
  //     return this.providers.map(p => {
  //       const copy = { ...p };
  //       this.selectedProviders = this.selectedProviders || [];
  //       copy.selected = this.selectedProviders.includes(p._id);
  //       return copy;
  //     });
  //   }
  // },

  methods: {
    async getProviders() {
      const response = await ProvidersService.fetchProviders();
      this.providers = response.data;
    },
    deleteProvider(id) {
      ProvidersService.deleteProvider(id);
      //this.providers = this.providers.filter(p => p._id !== id);
      this.getProviders();
    },
    toggleSelectedProvider(provider) {
      EventBus.$emit("client-providers-changed", provider._id);
    },
    async updateProvider() {
      await ProvidersService.updateProvider({
        id: this.$route.params.id,
        provider: this.provider
      });
      this.providerForChange = {};
      EventBus.$emit("providers-list-changed");
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