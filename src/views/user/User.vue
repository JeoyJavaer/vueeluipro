<template xmlns="http://www.w3.org/1999/html">
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
                clearable
                @change="inputSearch"
            ></el-input>

          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUserClick">添加</el-button>
          </el-col>
          <el-dialog
              :title="showpassword?'添加用户':'修改用户信息'"
              :visible.sync="addDialogVisible"
              width="60%">

            <el-form :model="userinfo" :rules="addUserRule" ref="addUserForm" label-width="100px">
              <el-form-item label="用户名" prop="username" v-if="showpassword">
                <el-input v-model="userinfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" v-if="showpassword">
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
              <el-button
                  size="mini"
                  type="warning"
                  @click="allocateClick(scope.row)">分配角色
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
    <el-dialog
        title="确定要删除用户吗？"
        :visible.sync="delDialogVisible"
        width="60%" :before-close="delDialogCancel">
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialogCancel">取 消</el-button>
    <el-button type="primary" @click="submitDelUser">确 定</el-button>
    </span>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="alloDialogVisible"
        width="50%">
      <div class="allo-roll-item" >当前用户:{{role.username}}</div><br>
      <div class="allo-roll-item">当前角色:{{role.role_name}}</div><br>
      <div class="allo-roll-item">分配角色:
        <el-select  v-model="selectedRoleId" placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="alloDialogCancel">取 消</el-button>
    <el-button type="primary" @click="alloDialogSure">确 定</el-button>
   </span>
    </el-dialog>


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
      delDialogVisible: false,
      alloDialogVisible: false,

      userinfo: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      showpassword: true,//控制弹窗是用于新添加用户还是修改用户信息中的，是否显示密码
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
          {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3到 15 个字符', trigger: 'blur'}
        ]
      },
      users: [],
      userItem: {},
      totalItem: 0,
      roleList: [],

      role: {},
      selectedRoleId:''
    }
  },

  created() {
    this.getUserList()
    this.getRoleList()
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

    //分配权限时，需要展示的权限列表
    async getRoleList() {
      const res = await this.$axios.get('/roles')
      if (res.meta.status === 200) {
        this.roleList = res.data
      }
    },

    addUserClick() {
      this.userinfo.username = ''
      this.userinfo.password = ''
      this.userinfo.email = ''
      this.userinfo.mobile = ''
      this.addDialogVisible = true
      this.showpassword = true
      // this.$refs.addUserForm.resetFields()
    },

    submitAddUser() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {// 校验通过，提交数据
          if (this.showpassword) {  //添加用户
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
              // console.log(res.data);
            })
          } else { //修改用户
            this.$axios.put('/users/' + this.userinfo.id, {
              email: this.userinfo.email,
              mobile: this.userinfo.mobile
            }).then((res) => {
              if (res.meta.status === 200) {
                //创建成功
                this.$message.success("修改成功")
                this.getUserList()//刷新数据
                //服务器返回成功，则清除表单数据，并设置为隐藏
                this.cancelAddUser()
              } else {
                //返回错误则提示错误信息
                this.$message.error(res.meta.msg)
              }
            })

          }

        }
      })
    },

    cancelAddUser() {
      this.$refs.addUserForm.resetFields()
      this.addDialogVisible = false
    },

    editClick(index, data) {
      //编辑用户
      this.setUserInfo(data)
      this.showpassword = false
      this.userItem = data
      this.addDialogVisible = true
    },

    deleteClick(index, data) {
      //删除用户
      this.delDialogVisible = true;
      this.setUserInfo(data)
    },
    allocateClick(row) {
      // console.log(row);
      this.role.userId=row.id;
      this.role.username=row.username;
      this.role.role_name=row.role_name;
      this.alloDialogVisible = true
    },
    alloDialogCancel() {
      this.alloDialogVisible = false
    },

   async alloDialogSure() {
      //roleId 选中了某个角色
     console.log(this.selectedRoleId);
     if (this.selectedRoleId){
        const  res=await this.$axios.put('/users/'+this.role.userId+'/role',{rid:this.selectedRoleId})
        console.log(res);
        if (res.meta.status===200){
          this.$message.success(res.meta.msg)
          this.alloDialogVisible=false
        }else {
          this.$message.error(res.meta.msg)
        }
      }else {
       if (!this.selectValueRoleId) return this.$Message.error('选择要分配的角色')
     }
    },

    cleanUserInfo() {
      this.userinfo.username = ''
      this.userinfo.password = ''
      this.userinfo.email = ''
      this.userinfo.mobile = ''
      this.userinfo.id = ''
    },

    setUserInfo(data) {
      this.userinfo.username = data.username
      this.userinfo.email = data.email
      this.userinfo.mobile = data.mobile
      this.userinfo.id = data.id
      this.userinfo.password = data.password
    },

    delDialogCancel() {
      this.delDialogVisible = false
      this.cleanUserInfo()
    },

    submitDelUser() {
      this.$axios.delete('/users/' + this.userinfo.id).then((res) => {
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          this.getUserList()
          this.delDialogVisible = false
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },

    userStateChange(index, data) {
      console.log(data);
      this.$axios.put('/users/' + data.id + '/state/' + data.mg_state).then((res) => {
        if (res.meta.status === 200) {
          this.$message.success("修改状态成功")
        } else {
          this.$message.error(res.meta.msg)
          //修改失败，状态返回
        }
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
    },

    inputSearch(value) {
      this.query = value
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

.allo-roll-item{
  margin: 15px;
}
</style>
