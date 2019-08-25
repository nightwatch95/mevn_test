<template>
	<button type="button" class="btn btn-primary" @click="addClient()" :disabled="$v.$invalid">Add Client</button>
</template>

<script>
import EventBus from '../EventBus.js';

export default {
	name: "button-add-client",

	methods: {
		addClient() {
			EventBus.$emit('add-client');
		}
	}
}
</script>