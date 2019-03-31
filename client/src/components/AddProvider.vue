<template>
  <div class="providers">
    <h1>Add Provider</h1>
    <div class="form">
      <div>
        <input type="text" name="title" placeholder="NAME" v-model="provider.name">
      </div>
      <div>
        <button class="app_provider_btn" @click="addProvider">Add</button>
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
      // let uri = 'http://localhost:4000/providers/addProvider';
      // this.axios.post(uri, { provider: this.provider }).then(() => {
      //     this.$router.push({name: 'providers'});
      // });
      await ProvidersService.addProvider({
        provider: this.provider
      });
      this.$router.push({ name: "Providers" });
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
  width: 500px;
  border: none;
  cursor: pointer;
}
</style>
