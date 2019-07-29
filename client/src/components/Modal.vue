<template>
	<div v-if="showModal">
		<transition name="modal">
			<div class="modal-mask">
                <div class="modal-wrapper">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Modal title</h5>
							<button type="button" class="close" aria-label="Close" @click="showModal = false">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<editClient></editClient>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary">Save changes</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import EventBus from '../EventBus.js';
import EditClient from '@/components/EditClient';

export default {
	name: "modal",

	components: {
		EditClient
	},

	data() {
		return {
			showModal: false,
			clientId: ''
		};
	},

	mounted() {
		EventBus.$on('show-modal', (id) => {
			console.log("show-modal catched");
			this.clientId = id;
			this.showModal = true;
		});
		EventBus.$on("close-modal", (id) => {
			this.showModal = false;
		});
	}
}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
</style>