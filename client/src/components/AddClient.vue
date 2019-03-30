<template>
    <div class="clients">
		<h1>Add Client</h1>
      	<div class="form">
        	<div>
				<label for="name">Name:</label>
          		<input id="name" type="text" name="title" placeholder="Name" v-model="client.name">
        	</div>
        	<div>
				<label for="email">Email:</label>
          		<input id="email" type="text" placeholder="somebox@gmail.com" v-model="client.email">
        	</div>
			<div>
				<label for="phone">Phone:</label>
          		<input id="phone" type="text" placeholder="+1 234 456 78 90" v-model="client.phone">
        	</div>
			<div>
				<label for="providers">Providers:</label>
				<!-- <providerslist ref="providersList"></providerslist> -->
			</div>
			<div>
				<button class="app_client_btn" @click="addClient">Add</button>
			</div>
		</div>
    </div>
</template>

<script>
  import ClientsService from '@/services/ClientsService'
  import providerslist from '@/components/Providers'

  export default {
    name: 'addClient',

    data(){
        return {
            client: {}
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
	label {
		display: inline-block;
    	text-align: left;
    	width: 80px;
	}
</style>
