<template>
	<div v-if="showModal">
		<transition name="modal">
			<div class="modal-mask">
                <div class="modal-wrapper">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 v-if="clientId != null" class="modal-title">Edit Client</h5>
								<h5 v-else>New Client</h5>
								<button type="button" class="close" aria-label="Close" @click="showModal = false">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<clientForm :id="clientId"></clientForm>
							</div>
							<div class="modal-footer">
								<div v-if="clientId == null">
									<button-add-client></button-add-client>
								</div>
								<div v-else>
									<button-edit-client></button-edit-client>
								</div>
								<!-- <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button> -->
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
import ClientForm from '@/components/ClientForm';
import ButtonAddClient from '@/components/ButtonAddClient.vue'
import ButtonEditClient from '@/components/ButtonEditClient.vue'

export default {
	name: "modal",

	components: {
		ClientForm,
		ButtonAddClient,
		ButtonEditClient
	},
	data() {
		return {
			showModal: false,
			clientId: ''
		};
	},
	mounted() {
		EventBus.$on('show-modal', (id) => {
			this.clientId = id;
			this.showModal = true;
		});
		EventBus.$on("close-modal", () => {
			this.showModal = false;
		});
	},
	methods: {
		
		
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