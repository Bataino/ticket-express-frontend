<template>
  <div class="">
    <te-header />
    <div class="p-4 px-md-5">
      <h2 class=" bold">
        DashBoard
      </h2>
      <div class="row">
        <div class="col-12 col-md-7">
          <div class="">
            <Card>
              <template #title> Orders </template>
              <template #content>
                <div class="w-100">
                  <Chart type="bar" :data="chartData" :optios="chartOptions" />
                </div>
              </template>
            </Card>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="w-100">
            <Card>
              <template #title> Events Stats </template>
              <template #content>
                <div>
                  <Chart type="pie" :data="pieChartData" :opions="pieChartOptions" class="md:w-10rem" />
                </div>
              </template>
            </Card>
            <!-- <div class="d-flex justify-content-center w-100"> -->
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="w-100">
            <Card>
              <template #title> Recent Orders </template>
              <template #content>
                <DataTable :value="$store.state.allOrders?.data.slice(0, 5)" tableStyle="">
                  <Column field="id" header="ID">
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
                  <Column field="price" header="Price">
                    <template #body="e">
                      {{ $te.currency }} {{ e.data.price }}
                    </template>
                  </Column>
                  <Column field="created_at" header="Date">
                    <template #body="{ data }">
                      <div class="">
                        <span>{{ new Date(data.created_at).toLocaleString() }}</span>
                      </div>
                    </template>
                  </Column>
                </DataTable>
              </template>
            </Card>
            <!-- <div class="d-flex justify-content-center w-100"> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import Chart from "primevue/chart"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref, onMounted } from "vue"

</script >

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
      chartOptions: {},
      chartData: {
        labels: [],
        datasets: [
          {
            label: [],
            data: [],
            fill: false,
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: documentStyle.getPropertyValue('--bs-primary'),
            tension: 0.4
          },
        ]
      },
      pieChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      }
    }
  },
  methods: {
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      return {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          indexAxis: 'y',
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      }
    },
    async getGraphData() {
      const res = await this.$store.dispatch('getDashboardService')
      const tickets = res.data.tickets
      const orders = res.data.orders

      this.pieChartData.datasets[0].data = Object.values(tickets)
      this.pieChartData.labels = Object.keys(tickets)

      this.chartData.datasets[0].data = Object.values(orders)
      this.chartData.datasets[0].label = Object.keys(orders)
      this.chartData.labels = Object.keys(orders)
      console.log("Obj", Object.values(orders))
    }
  },
  components: {

  },
  mounted() {
    this.chartOptions = this.setChartOptions();
  },
  async created() {
    await this.$store.dispatch('getAllOrdersService')
    this.getGraphData()
  }
}
</script>

<style>
.p-card {
  margin-top: 20px !important;
  /* min-height: 500px; */
  /* overflow: hidden; */
}
</style>