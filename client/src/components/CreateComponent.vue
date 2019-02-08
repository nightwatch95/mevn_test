<template>
  <div>
    <form @submit.prevent="addClient">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="client.name">
          </div>
        </div>
      </div>
        <div class="row justify-content-center">
            <div class="col-md-6">
            <div class="form-group">
                <label>Email:</label>
                <input type="text" class="form-control" v-model="client.email">
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Phone:</label>
                    <input type="text" class="form-control" v-model="client.phone">
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="form-group">
              <label>Providers:</label>
              <textarea class="form-control" v-model="client.providers" rows="5"></textarea>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            client: {}
        };
    },
    methods: {
      addClient(){
        let uri = 'http://localhost:4000/clients/add';
        this.axios.post(uri, this.client).then(() => {
          this.$router.push({name: 'clients'});
        });
      }
    }
  }
</script>

