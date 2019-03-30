<template>
	<div class="providers">
    	<h1>Edit Provider</h1>
		<div class="form">
			<div>
				<input type="text" name="title" placeholder="NAME" v-model="provider.name">
			</div>
			<div>
				<button class="app_provider_btn" @click="updateProvider">Update</button>
			</div>
		</div>
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

<style type="text/css">
.form input, .form textarea {
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
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
