<template>
	<button type="button" class="btn btn-primary" @click="updateClient()">Save Changes</button>
</template>

<script>
import EventBus from '../EventBus.js';

export default {
	name: "button-edit-client",
	
	methods: {
		updateClient() {
			EventBus.$emit('update-client');
		}
	}
}
</script>