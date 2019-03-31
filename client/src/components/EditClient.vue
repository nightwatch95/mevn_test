<template>
  <div class="clients">
    <h1>Edit Client</h1>
    <div class="form">
      <div>
        <input type="text" name="title" placeholder="NAME" v-model="client.name">
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="EMAIL" v-model="client.email"></textarea>
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="PHONE" v-model="client.phone"></textarea>
      </div>
      <div>
        <providerslist ref="providersList"></providerslist>
      </div>
      <div>
        <button class="app_client_btn" @click="updateClient">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: {}
    };
  },
  created() {
    let uri = `http://localhost:4000/clients/edit/${this.$route.params.id}`;
    this.axios.get(uri).then(response => {
      this.client = response.data;
    });
  },
  methods: {
    updateClient() {
      let uri = `http://localhost:4000/clients/update/${this.$route.params.id}`;
      this.axios.post(uri, { client: this.client }).then(() => {
        this.$router.push({ name: "clients" });
      });
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
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
