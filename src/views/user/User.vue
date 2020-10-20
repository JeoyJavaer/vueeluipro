<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="10">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input
                placeholder="用户名"
                v-model="query"
                clearable></el-input>

          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUserClick">添加</el-button>
          </el-col>
          <el-dialog
              title="添加用户"
              :visible.sync="addDialogVisible"
              width="60%">

            <el-form :model="userinfo" :rules="addUserRule" ref="addUserForm" label-width="100px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userinfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="userinfo.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userinfo.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="userinfo.mobile"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAddUser">取 消</el-button>
            <el-button type="primary" @click="submitAddUser">确 定</el-button>
             </span>
          </el-dialog>
        </el-row>
        <el-table
            class="user-list-table"
            :stripe="true"
            border
            :data="users">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="username"
              label="用户名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱"
              width="180">
          </el-table-column>
          <el-table-column
              prop="mobile"
              label="手机号">
          </el-table-column>
          <el-table-column label="可用">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.mg_state" @change="userStateChange(scope.$index,scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="editClick(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteClick(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
            class="user-list-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2,  5, 10]"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper,sizes"
            :total="totalItem">
        </el-pagination>
      </el-row>


    </div>

  </el-card>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      addDialogVisible: false,
      userinfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRule: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 7, message: '长度在 4 到 7 个字符', trigger: 'blur'}
        ], email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3到 15 个字符', trigger: 'blur'}
        ]
      },
      users: [],
      userItem: {},
      totalItem: 0
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    getUserList() {
      this.$axios({
        url: '/users',
        params: {
          'query': this.query,
          'pagenum': this.pagenum,
          'pagesize': this.pagesize
        }

      }).then((res) => {
        console.log('user:' + res.data);
        this.users = res.data.users
        this.totalItem = res.data.total
        this.pagenum = res.data.pagenum

      })
    },

    addUserClick() {
      this.addDialogVisible = true
    },

    submitAddUser() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {// 校验通过，提交数据
          this.$axios.post('/users', this.userinfo).then((res) => {
            if (res.meta.status === 201) {
              //创建成功
              this.$message.success("添加成功")
              this.getUserList()//刷新数据
              //服务器返回成功，则清除表单数据，并设置为隐藏
              this.cancelAddUser()
            } else {
              //返回错误则提示错误信息
              this.$message.error(res.meta.msg)
            }
            console.log(res.data);
          })
        }
      })
    },

    cancelAddUser() {
      this.$refs.addUserForm.resetFields()
      this.addDialogVisible = false
    },

    editClick(index, data) {
      //编辑用户
      console.log(data);
      this.userItem = data
    },

    deleteClick(index, data) {
      //删除用户
    },

    userStateChange(index, data) {
      console.log(data);
      //TODO  修改用户状态
      let idStr = Number(data.id)
      this.$axios.put('/users', {
          uId:idStr,
          type:data.mg_state
      }).then((res) => {
        console.log(res);
      })
    },

    handleSizeChange(pagesize) {//每页的数目发生变化
      console.log(pagesize);
      this.pagesize = pagesize
      this.getUserList()
    },

    handleCurrentChange(pagenum) {// 当前第几页发生变化
      console.log(pagenum);
      this.pagenum = pagenum
      this.getUserList()
    }
  }
}
</script>

<style scoped>

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  height: 100%;
  margin: 2px;

}

.user-breadcrumb {
  margin-bottom: 15px;
}

.user-list-table {
  margin-top: 15px;
}

.user-list-pagination {
  margin-top: 15px;
}
</style>
