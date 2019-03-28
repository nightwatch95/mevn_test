<template>
    <form @submit.prevent="addClient" class="container">
		<div class="form-group row">
			<label class="col-sm-2 col-form-label">Name:</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" v-model="client.name">
			</div>
		</div>
		<div class="form-group row">
			<label class="col-sm-2 col-form-label">Email:</label>
			<div class="col-sm-10">
				<input type="email" class="form-control" v-model="client.email">
			</div>
		</div>
		<div class="form-group row">
			<label class="col-sm-2 col-form-label">Phone:</label>
			<div class="col-sm-10">
				<input type="tel" pattern="^\d{4}-\d{3}-\d{4}$" class="form-control" required v-model="client.phone">
			</div>
		</div>
		<fieldset class="form-group">
			<div class="row">
				<legend class="col-form-label col-sm-2 pt-0">Providers:</legend>
				<div class="col-sm-10">
					<providerslist ref="providersList"></providerslist>
				</div>
			</div>
		</fieldset><br />
        <div class="form-group">
          <button class="btn btn-primary">{{ buttonText }}</button>
        </div>
    </form>
</template>

<script>
  import ClientsService from '@/services/ClientsService'
  import providerslist from '@/components/providers/ProvidersList'

  export default {
    name: 'addClient',

    data(){
        return {
            client: {},
            buttonText: "Create"
        };
    },
    components: {
      providerslist
    },
    methods: {
        addClient(){
          let uri = 'http://localhost:4000/clients/add';
          client.providers = this.$refs.providerslist.selected;
          this.axios.post(uri, { client: this.client }).then(() => {
            this.$router.push({name: 'clients'});
          });
        }
    }
}
</script>

<style type="text/css">
	.container {
		max-width: 70%;
    	margin-left: auto;
    	margin-right: auto;
	}
</style>
