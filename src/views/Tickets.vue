<template>
	<div class="">
		<!-- <te-header /> -->
		<div class="p-3 d-flex justify-content-between align-items-center">
			<div class="d-flex">
				<div class="__border border-primary rounded-7 p-2 px-3 __bg-whitesmoke">
					Ticket Scanned: 
					<span class="fs-4 bold text-primary">
						{{ getScannedTickets.length }}
					</span>
				</div>
				<div class="__border border-primary rounded-7 p-2 px-3 __bg-whitesmoke">
					Total Tickets: 
					<span class="fs-4 bold text-primary">
						{{ $store.state.tickets.length }}
					</span>
				</div>
			</div>
			<div class="mb-3 float-end">
				<router-link class="btn btn-primary mt-3" :to="'/scan/' + $route.params.id">
					Scan Tickets
				</router-link>
			</div>
		</div>
		<div>
			<div class="border rounded-7 p-2">
				<!-- <form class="d-flex w-100 justify-content-center p-3" @submit.prevent="searchTickets">
					<input type="search" placeholder="Search..." class="w-100 border p-2 rounded-7" v-model="filter" />
					<button class="btn btn-primary small d-flex align-items-center rounded-7 ms-1" type="submit">
						<icon icon="material-symbols:search" class="fs-5" />
					</button>
				</form> -->
				<DataTable :value="$store.state.tickets" paginator :rows="10" v-model:filters="filters"
					globalFilterFields="['id', 'ticket_level.title', 'is_scanned', 'status']" tableStyle="">
					<template #empty>
						<div class="text-center h5 text-muted bold py-5">
							<icon icon="teenyicons:mood-sad-outline" class="fs-2" />
							No Tickets could be found
						</div>
					</template>
					<Column field="id" header="ID" sortable>
					</Column>
					<Column field="price" header="User" filterMatchMode="contains">
						<template #body="e">
							{{ e.data.user.first_name + " " + e.data.user.last_name }}
						</template>
					</Column>
					<Column field="summary" header="Qr Code">
						<template #body="{ data }">
							<div class="">
								<Image :src="data.qr_code" preview="" class="" width="70" />
							</div>
						</template>
						<!-- <template #filter="{ filterModel, filterCallback }">
							<InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
								class="p-column-filter" placeholder="Search" />
						</template> -->
					</Column>
					<Column field="price" header="Ticket Level" filterMatchMode="contains">
						<template #body="e">
							{{ e.data.ticket_level.title }}
						</template>
					</Column>
					<Column field="price" header="Status" filterMatchMode="contains">
						<template #body="e">
							{{ e.data.is_scanned ? 'Scanned' : 'Not Scanned' }}
						</template>
					</Column>
					<Column field="created_at" header="Date" filterField="representative.name" sortable>
						<template #body="{ data }">
							<div class="">
								<span>{{ new Date(data.created_at).toLocaleString() }}</span>
							</div>
						</template>
						<!-- <template #filter="{ filterModel, filterCallback }">
							<InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
								class="p-column-filter" placeholder="Search" />
						</template> -->
					</Column>
				</DataTable>
			</div>
		</div>
		<Dialog v-model:visible="isScanning" style="min-width: 98%;" class="overflow-hidden bg-white" >
				<scan-ticket style="min-width:98%;min-height: 100vh;" class=""></scan-ticket>
		</Dialog>
	</div>
</template>

<script setup>
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Image from "primevue/image"
import ScanTicket from "@/views/scan/ScanPage.vue"
</script>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import { FilterMatchMode } from 'primevue/api';

export default {
	name: 'Order',
	components: {
	},
	data() {
		return {
			visible: false,
			modalData: {},
			orders: [],
			lazyParams: {},
			loading: false,
			page: '',
			filter: '',
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
				name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
				'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
				representative: { value: null, matchMode: FilterMatchMode.IN },
				status: { value: null, matchMode: FilterMatchMode.EQUALS },
				verified: { value: null, matchMode: FilterMatchMode.EQUALS }
			},
			summary: {},
			scanApp: "",
			isScanning: false
		}
	},
	computed: {
		getTokenFormatted() {
			return this.$store.getters.token.split("|")[1]
		},
		getScannedTickets(){
			return this.$store.state.tickets.filter((e) => e.is_scanned)
		},
	},
	methods: {
		...mapActions(["getSingleEventService", "getOrdersService", "getTicketsService"])
	},
	async created() {
		// if(!this.$store.state.tickets?.[0])
		await this.getTicketsService(this.$route.params.id)
		// console.log(this.$store.state.tickets)
		// console.log(import.meta)
		// this.scanApp = import.meta.env.SCAN_APP_URL
	}
}
</script>

<style>

</style>