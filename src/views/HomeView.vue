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
                  <Chart type="bar" :data="chartData" :options="chartOptions" />
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
                  <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="md:w-10rem" />
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
                <DataTable :value="products" tableStyle="min-width: 50rem">
                  <Column field="code" header="Code"></Column>
                  <Column field="name" header="Name"></Column>
                  <Column field="category" header="Category"></Column>
                  <Column field="quantity" header="Quantity"></Column>
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65],
            fill: false,
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: documentStyle.getPropertyValue('--bs-primary'),
            tension: 0.4
          },
          {
            label: 'Second Dataset',
            data: [, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--bs-danger'),
            tension: 0.4
          }
        ]
      },
      pieChartData: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [540, 325, 702],
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
    }
  },
  components: {

  },
  mounted() {
    this.chartOptions = this.setChartOptions();
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