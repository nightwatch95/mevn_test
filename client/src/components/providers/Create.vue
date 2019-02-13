<template>
  <div>
    <form @submit.prevent="addProvider">
        <div class="row justify-content-center">
            <div class="col-md-6">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" class="form-control" v-model="provider.name">
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create provider</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            provider: {}
        };        
    },
    methods: {
        addProvider() {
            let uri = 'http://localhost:4000/providers/add';
            this.axios.post(uri, { provider: this.provider }).then(() => {
                this.$router.push({name: 'providers'});
            });
        }
    }
  }
</script>