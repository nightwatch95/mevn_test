<template>
	<div v-if="this.isVisible" class="alert alert-danger alert-dismissible fade show">
		{{ message }}
		<button type="button" class="close" @click.prevent="closeToast">&times;</button>
	</div>
</template>

<script>
import EventBus from "../EventBus.js";

export default {
	name: "toast",

	data() {
		return {
			isVisible: false,
			message: ""
		}
	},
	mounted() {
		EventBus.$on('show-toast', (message) => {
            this.showToast(message);
        });
	},
	methods: {
		showToast(message) {
			this.message = message;
			this.isVisible = true;
		},
		closeToast() {
			this.message = "";
			this.isVisible = false;
		}
	}
}
</script>