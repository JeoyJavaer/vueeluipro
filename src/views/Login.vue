<template>
  <div>
    <div class="login-container">
      <h2 class="login-title">统计系统</h2>
      <el-form ref="loginForm" :model="user" :rules="rules" class="login-form" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model='user.password' placeholder="密码" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="resetUser" type="info">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      token: '',

      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 7, message: '长度在 5 到 7 个字符', trigger: 'blur'}
        ]
      },

      data: {}
    }
  },

  methods: {
    resetUser() {
      this.$refs.loginForm.resetFields()
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        console.log('result:' + valid);
        if (valid) {  //数据校验成功 ，发送请求登录

          this.$axios.post('/login', this.user).then((res) => {
            console.log('res' + res);

            this.data=res
            if (res.meta.status === 200) {
              window.sessionStorage.setItem('token', res.data.token);
              this.$message.success('登录成功');
              this.$router.push('/home')
            } else {
              this.$message('登录失败');
            }

          }).catch((err) => {
            console.log('err:' + err);
          })

        } else {
          this.$message('登录失败');
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  /*margin: 0 auto;*/
  justify-content: center;
  width: 700px;
  height: 500px;
  margin: 80px;
  background: darkseagreen;
}

.login-form {
  margin: auto;
}

.login-title {
  font-size: 22px;
  margin-bottom: 10px;
  line-height: 30px;
  padding: 10px;
  color: #a0a2a5;
  border-bottom: 1px solid #3e4653;
}
</style>
