<template>
  <div id="app">

    <router-view/>
    <login></login>
  </div>
</template>

<script>
import Login from "@/views/home/Login";

export default {
  name: 'app',
  components:{
    Login,
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
