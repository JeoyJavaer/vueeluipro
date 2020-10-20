<template>
  <div class="welcome"> {{usermame}}</div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      usermame: '',
    }
  },

  mounted() {
    this.initUserInfo()
  },

  methods: {
    initUserInfo() {
      this.usermame = this.$store.state.username
    }

  }

}
</script>

<style scoped>
.welcome {
  text-align: center;
  margin: 0 auto;
}
</style>
