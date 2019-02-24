<template>
  <div>
    <h1>Edit provider</h1>
    <form @submit.prevent="updateProvider">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" class="form-control" v-model="provider.name">
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
    name: 'editProvider',

    data () {
      return {
        provider: {}
      };
    },
    created() {
      let uri = `http://localhost:4000/providers/edit/${this.$route.params.id}`;
      this.axios.get(uri).then(response => {
        this.provider = response.data;
      });
    },
    methods: {
      updateProvider() {
        let uri = `http://localhost:4000/providers/update/${this.$route.params.id}`;
        this.axios.post(uri, { provider: this.provider } ).then(() => {
          this.$router.push({name: 'providers'});
        });
      }
    }
  };
</script>