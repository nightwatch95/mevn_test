<template>
  <div>
    <h1>Edit Client</h1>
    <form @submit.prevent="updateClient">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" class="form-control" v-model="client.name">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" v-model="client.email">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Phone</label>
              <input type="text" class="form-control" v-model="client.phone">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Providers</label>
              <textarea class="form-control" v-model="client.providers" rows="5"></textarea>
            </div>
          </div>
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
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
        this.axios.post(uri, { client: this.client } ).then(() => {
          this.$router.push({name: 'clients'});
        });
      }
    }
  };
</script>