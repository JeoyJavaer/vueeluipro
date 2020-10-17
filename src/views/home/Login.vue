<template>
  <div class="login-container">
    <h2>登录</h2>
    <el-form class="login-form" label-width="0px">
      <el-form-item >
        <el-input aria-placeholder="用户名" ></el-input>
      </el-form-item>
      <el-form-item >
        <el-input aria-placeholder="密码" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>


export default {
  name: "Login"
}
</script>

<style scoped>
.login-container{
  margin: 0 auto;
  width: 800px;
  height:60px;
  background: darkseagreen;
}

.login-form{
  margin: auto;
}
</style>
