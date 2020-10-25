<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="handAddBtn">添加</el-button>
        </el-col>
      </el-row>
      <el-table
          style="width: 100%"
          :stripe="true"
          border
          class="roles-table"
          :data="roleList">
        <el-table-column
            type="expand">
          <template slot-scope="scope">

            <!--一级权限-->
            <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id"
                    :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']">
              <el-col :span="5">
                <el-tag closable @close="handleClose(scope.row,item1.id)">{{ item1.authName }}</el-tag>
                <!--向右的箭头-->
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!--二级权限-->
                <el-row v-for="(item2,i2) in item1.children" :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                        :key="item2.id">
                  <el-col :span="5">
                    <el-tag closable type="success" @close="handleClose(scope.row,item2.id)">{{
                        item2.authName
                      }}
                    </el-tag>
                    <!--向右的箭头-->
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--三级权限-->
                  <el-col :span="14">
                    <el-tag closable
                            v-for="(item3,i3) in item2.children"
                            type="warning"
                            :key="item3.id"
                            @close="handleClose(scope.row,item3.id)"
                    >{{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </template>


        </el-table-column>
        <el-table-column
            label="#"
            row-key="id"
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="roleName"
            label="角色名称"
        >
        </el-table-column>
        <el-table-column
            prop="roleDesc"
            label="角色描述"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRoleClick(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteClick(scope.row)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="allocateClick(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--点击分配权限时的弹窗-->
    <el-dialog
        title="分配权限"
        :visible.sync="allocateDiaVisible"
        width="50%"
        :before-close="handleAllocateClose">

      <el-tree
          ref="allocateRoleTable"
          :data="allocateList"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="defaultCheckedKeys"
          :props="treeProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
       <el-button @click="cancelAllocate">取 消</el-button>
       <el-button type="primary" @click="sureAllocate">确 定</el-button>
      </span>
    </el-dialog>


    <!--添加角色的弹窗-->
    <el-dialog
        title="添加角色"
        :visible.sync="addDialogVisible"
        width="40%">
      <el-form :model="addedRole" :rules="addRules" label-width="100px" ref="addRoleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addedRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addedRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="cancelAddDialog">取 消</el-button>       <el-button type="primary"
                                                                            @click="confirmAddDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改角色的弹窗-->
    <el-dialog
        title="修改角色"
        :visible.sync="editDialogVisible"
        width="40%">
      <el-form :model="editRole" :rules="editRules" label-width="100px" ref="editRoleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="cancelEditDialog">取 消</el-button>
        <el-button type="primary" @click="confirmEditDialog">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      roleList: [],
      allocateDiaVisible: false,
      addDialogVisible: false,
      editDialogVisible: false,
      rightAdded: {},
      role: {
        roleId: 0,
        rightId: 0
      },

      allocateList: [],
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      defaultCheckedKeys: [],
      roleId: '',
      addedRole: {},
      addRules: {
        roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}],
        roleDesc: [{required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}]
      },
      editRole: {},
      editRules: {
        roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}],
        roleDesc: [{required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getRolesList()

  },

  methods: {
    /*获取角色列表*/
    async getRolesList() {
      const res = await this.$axios.get('/roles')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.roleList = res.data
    },

    /*获取所有权限列表*/
    async getAllRightList(role) {
      const res = await this.$axios.get('/rights/tree')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }

      this.allocateList = res.data

      //遍历指定用户下的含有的权限
      this.getLeafKeys(role, this.defaultCheckedKeys)
      this.allocateDiaVisible = true
    },

    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },


    /*删除指定用户的各个权限*/
    async handleClose(row, rightId) {
      this.role.roleId = row.id;
      this.role.rightId = rightId
      const res = await this.$axios.delete('/roles/' + this.role.roleId + '/rights/' + rightId)
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
      this.$message.success(res.meta.msg)
      row.children = res.data

    },

    async getAllocatedByRoleId() {
      const res = await this.$axios.get('/roles/' + this.role.roleId)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
    },

    allocateClick(role) {
      this.roleId = role.id
      this.getAllRightList(role)

    },
    /*分配权限关闭的操作*/
    handleAllocateClose() {
      this.defaultCheckedKeys = []
      this.allocateDiaVisible = false
    },
    /*点击了取消分配权限的弹出*/
    cancelAllocate() {
      this.defaultCheckedKeys = []
      this.allocateDiaVisible = false
    },
    /*点击了确定分配权限*/
    async sureAllocate() {
      const keys = [
        ...this.$refs.allocateRoleTable.getCheckedKeys(),
        ...this.$refs.allocateRoleTable.getHalfCheckedKeys()]

      let keyIds = keys.join(',');
      console.log(keyIds);
      const res = await this.$axios.post('/roles/' + this.roleId + '/rights', {rids: keyIds})
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
      this.$message.success(res.meta.msg)
      this.defaultCheckedKeys = []
      this.allocateDiaVisible = false
      this.getRolesList()
    },


    handAddBtn() {
      this.addDialogVisible = true
    },
    cancelAddDialog() {
      this.addedRole = {}
      this.addDialogVisible = false
    },

    async confirmAddDialog() {
      this.$refs.addRoleForm.validate((validate) => {
        if (validate) {
          this.$axios.post('/roles', {
            roleName: this.addedRole.roleName,
            roleDes: this.addedRole.roleDesc
          }).then((res) => {
            console.log(res);
            if (res.meta.status === 201) {
              this.$message.success(res.meta.msg)
              this.getRolesList()
              this.cancelAddDialog()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        }
      })

    },


    async doDelete(id) {
      const res = await this.$axios.delete('/roles/' + id)
      if (res.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.getRolesList()
      }

    },

    async deleteClick(row) {
      this.$confirm('此操作将永久删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },

    editRoleClick(row) {
      console.log(row);
      this.editRole.id = row.id
      this.editRole.roleName = row.roleName
      this.editRole.roleDesc = row.roleDesc
      this.editDialogVisible = true
    },
    cancelEditDialog() {
      this.editRole = {}
      this.editDialogVisible = false
    },

    async confirmEditDialog() {
      console.log(this.editRole);
      this.$refs.editRoleForm.validate((validate) => {
        if (validate) {
          this.$axios.put('/roles/' + this.editRole.id, {
            'roleName': this.addedRole.roleName,
            'roleDes': this.addedRole.roleDesc
          }).then((res) => {
            console.log(res);
            if (res.meta.status === 200) {
              this.$message.success(res.meta.msg)
              this.getRolesList()
              this.cancelEditDialog()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        }
      })

    },
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}

.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}

.roles-table {
  margin-top: 15px;
}
</style>
