<template>
  <div class="login">
    <div class="loginBox">
      <h2>爱逛街后台管理系统</h2>
      <el-form
          :model="user"
          :rules="rules"
          ref="loginForm"
          label-width="0px">
        <el-form-item
            label=""
            prop="username"
            style="margin-top:40px;">

          <el-input
              class="inps"
              placeholder='用户名'
              v-model="user.username"
              prefix-icon="el-icon-user-solid"
          ></el-input>

        </el-form-item>
        <el-form-item
            label=""
            prop="passWord">

          <el-input
              class="inps"
              placeholder='密码'
              type="password"
              v-model="user.password"
              prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:55px;">
          <el-button type="primary" round class="submitBtn" @click="login">登录</el-button>
          <el-button type="info" round class="resetBtn" @click="resetUser">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      user: {
        username: 'admin',
        password: '123456'
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
    };
  },
  methods: {
    //提交登录
    resetUser() {
      this.$refs.loginForm.resetFields()
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        console.log('result:' + valid);
        if (valid) {  //数据校验成功 ，发送请求登录

          this.$axios.post('/login', this.user).then((res) => {
            console.log('res' + res);
            if (res.meta.status === 200) {
              window.sessionStorage.setItem('token', res.data.token);
              this.$message.success('登录成功');
              this.$store.state.username = res.data.username
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
    },
  }
};
</script>

<style  scoped>
.el-form-item__content {
  line-height: 50px;
  position: relative;
  font-size: 34px;
}

.login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  color: #fff;
  font-family: "Source Sans Pro";
  background-size: 100%;
  background:url("~assets/login.png") no-repeat;
  position: relative;
}

.loginBox {
  width: 380px;
  height: 480px;
  position: absolute;
  top: 0;
  left: 30%;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(230deg,
  rgba(53, 57, 74, 0) 0%,
  rgb(0, 0, 0) 100%);
}

/deep/ .inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}


.iconfont {
  color: #fff;
}


.resetBtn {
  background-color: transparent;
  color: #ff5777;
  width: 100px;
  flex: 1;
}

.submitBtn {
  background-color: transparent;
  color: #39f;
  width: 100px;
  flex: 1;
}

</style>