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
        <button class="add_btn" @click="updateClient">Update</button>
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
