<template>
	<div class="">
		<!-- <te-header /> -->
		<div class="p-3">
			<div class="mb-3 d-flex flex-wrap">
				<!-- <div class="bg-warning rounded-7 bg-gradient text-dark mt-2 w-fit p-3 pe-5 me-2">
					Total Order<br>
					<span class="h5 bold">
						{{ $te.currency }}{{ summary.total_sale ?? 0 }}
					</span>
				</div> -->
			</div>
			<div class="border rounded-7 p-2">
				<form class="d-flex w-100 justify-content-center p-3" @submit.prevent="searchOrders">
					<input type="search" placeholder="Search..." class="w-100 border p-2 rounded-7" v-model="filter" />
					<button class="btn btn-primary small d-flex align-items-center rounded-7 ms-1" type="submit">
						<icon icon="material-symbols:search" class="fs-5" />
					</button>
				</form>
				<DataTable :value="$store.state.orders.data" lazy paginator :first="0" :rows="25" v-model:filters="filters"
					ref="dt" dataKey="id" :totalRecords="$store.state.orders.total" :loading="loading"
					@page="onPage($event)" @sort="onSort($event)" @row-click="showOrder($event)" tableStyle="">
					<template #empty>
						<div class="text-center h5 text-muted bold py-5">
							<icon icon="teenyicons:mood-sad-outline" class="fs-2" />
							You have not made any orders
						</div>
					</template>
					<Column field="id" header="ID" sortable>
					</Column>
					<Column field="summary" header="Summary">
						<template #body="{ data }">
							<div class="">
								<span>{{ data.summary }}</span>
							</div>
						</template>
						<!-- <template #filter="{ filterModel, filterCallback }">
							<InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
								class="p-column-filter" placeholder="Search" />
						</template> -->
					</Column>
					<Column field="price" header="Price" filterMatchMode="contains" sortable>
						<template #body="e">
							{{ $te.currency }} {{ e.data.price }}
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
		<Dialog modal v-model:visible="visible" header="Order Details" class="w-75" @hide="visible=false;modalData = {};">
			<div class="p-3 p-md-3 w-100 text-nowrap">
				<div class="fw-bold">
					Summary<br>
					<small class="fw-normal">
						{{ modalData.summary }}
					</small>
					<hr />
				</div>
				<div class="w-100 my-2 d-flex justify-content-between">
					<div class="w-50 pe-5">
						Event Name:
					</div>
					<div class="w-50 text-nowrap text-end">
						{{ modalData.event.title}}
					</div>
				</div>
				<div class="w-100 my-2 d-flex justify-content-between">
					<div class="w-50 pe-5">
						Price :
					</div>
					<div class="w-50 text-nowrap text-end">
						{{ $te.currency }}{{ modalData.price }}
					</div>
				</div>
				<div class="w-100 my-2 d-flex justify-content-between">
					<div class="w-50 pe-5">
						Payment details :
					</div>
					<div class="w-50 text-nowrap text-end">
						{{  modalData.payment_details  }}
					</div>
				</div>
				<hr />
				<div class="w-100 my-2 d-flex justify-content-between" v-for="(i, index) in modalData.items">
					<div class="">
						{{ getTicketLevel(i).title}} :
					</div>
					<div class=" text-nowrap text-end">
						{{index}}
					</div>
				</div>
				<hr />
				<div class="" style="min-width: 300px;">
					<div class="w-100 my-2 d-flex justify-content-between">
						<div class="">
							User :
						</div>
						<div class=" text-nowrap text-end">
							{{ modalData.user.first_name }} {{ modalData.user.last_name}}
						</div>
					</div>
					<div class="w-100 my-2 d-flex justify-content-between">
						<div class="">
							Email :
						</div>
						<div class=" text-end">
							{{ modalData.user.email }}
						</div>
					</div>
					<div class="w-100 my-2 d-flex justify-content-between">
						<div class="">
							Phone :
						</div>
						<div class=" text-nowrap text-end">
							{{ modalData.user.phone }}
						</div>
					</div>
				</div>
				<div class="text-end text-secondary pt-3">
					<icon icon="bxs:copy" class="fs-4" />
					<icon icon="ri:share-line" class="ms-2 fs-4" />
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script setup>
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable"
import Column from "primevue/column"

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
			},
			summary: {},
		}
	},
	methods: {
		async searchOrders() {
			this.$widget.openLoading()
			await this.getOrdersService({
				event_id: this.$route.params.id,
				page: this.page,
				params: {
					filter: this.filter
				}
			})
			this.$widget.dismiss()
		},
		async getOrderSummary() {
			const res = await this.getOrderSummaryService(this.$route.params.event_id)
			this.summary = res.data
		},
		showOrder(event) {
			this.modalData = event.data
			this.visible = true
			console.log(event.data)
		},
		getTicketLevel(id) {
			console.log(this.$store.state.event.ticket_level)
			return this.$store.state.event.ticket_levels.filter((e) => e.id = id)?.[0]
		},
		getNewPagination(event) {
			console.log(event, this.page)
			this.loading = true;
			this.page = event.page + 1
			this.getOrdersService({
				event_id: this.$route.params.event_id,
				page: this.page,
				params: {
					sortBy: event.sortField,
					sortOrder: event.sortOrder == 1 ? 'desc' : 'asc',
					filter: this.filter
				}
			})
			this.loading = false
		},
		onPage(event) {
			this.lazyParams = event;
			this.getNewPagination(event);
		},
		onSort(sortVal) {
			this.getOrdersService({
				event_id: this.$route.params.event_id,
				page: this.page,
				params: {
					sortBy: sortVal.sortField,
					sortOrder: sortVal.sortOrder == 1 ? 'desc' : 'asc',
					filter: this.filter
				}
			});
		},
		...mapActions(["getSingleEventService", "getOrdersService", "getOrderSummaryService"])
	},
	async created() {
		this.$route.params.event_id = this.$route.params.id 
		// await this.getTicketLevelsService()
		await this.getSingleEventService(this.$route.params.event_id)
		await this.getOrdersService({ event_id: this.$route.params.event_id })
		this.getOrderSummary()


		// this.loadLazyData();
	}
}
</script>
