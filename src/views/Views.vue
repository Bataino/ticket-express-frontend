<template>
    <div class="px-5 text-start">
      <div class="p-3 shadow rounded-20 mx-auto my-3 nuinto-2" v-for="route in routes" :key="route.name" @click="$router.push(route.path)">
          <b>
            {{route.name }}
          </b>
      </div>
    </div>
    </template>
    
    <script>
    export default {
      name:'',
      data(){
        return {
          routes:[]
        }
      },
      created(){
        let routes = this.$router.options.routes.sort((a, b) => {
           if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
          return 0;
        })
        this.routes = routes
        console.log(routes)
      }
    
    }
    </script>
    
    <style>
    
    </style>