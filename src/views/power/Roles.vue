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
                <el-tag closable @close="handleClose(scope.row.id,item1.id)">{{ item1.authName }}</el-tag>
                <!--向右的箭头-->
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!--二级权限-->
                <el-row v-for="(item2,i2) in item1.children" :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                        :key="item2.id">
                  <el-col :span="5">
                    <el-tag closable type="success" @close="handleClose(scope.row.id,item2.id)">{{
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
                            @close="handleClose(scope.row.id,item3.id)"
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
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="allocateClick">分配权限</el-button>
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

      <zk-table
          ref="table"
          selection-type
          :show-header="false"
          index-text="#"
          :data="allocateList"
          :props="treeProps"
          tree-type
          :columns="columns"
          :is-fold="false"
          :expand-type="true"
          >
        <template slot="$expand" slot-scope="scope">
          {{
            `My name is ${scope.row.name},
           this rowIndex is ${scope.rowIndex}.`
          }}
        </template>
      </zk-table>

      <span slot="footer" class="dialog-footer">
       <el-button @click="cancelAllocate">取 消</el-button>
       <el-button type="primary" @click="sureAllocate">确 定</el-button>
      </span>
    </el-dialog>


    <!--添加角色的弹窗-->
    <el-dialog
        title="添加角色"
        :visible.sync="addDialogVisible"
        width="50%"
        :before-close="handleAddClose">
      <el-form-item label="角色名称" :prop="rightAdded">
        <el-input v-model="rightAdded.authName"></el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
       <el-button @click="cancelAddDialog">取 消</el-button>
       <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
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
      rightAdded: {},
      role: {
        roleId: 0,
        rightId: 0
      },

      allocateList: [],
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      columns: [
        {
          label: 'authName',
          children: 'children'
        },
        {
          label: 'authName',
          children: 'children'
        }, {
          label: 'authName',
          children: 'children'
        }

      ],

    }
  },
  created() {
    this.getRolesList()
    this.getAllRightList()
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
    async getAllRightList() {
      const res = await this.$axios.get('/rights/tree')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.allocateList = res.data
    },


    /*删除指定用户的各个权限*/
    async handleClose(roleId, rightId) {
      this.role.roleId = roleId;
      this.role.rightId = rightId
      const res = await this.$axios.delete('/roles/' + roleId + '/rights/' + rightId)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.roleList = res.data

    },

    allocateClick() {
      this.allocateDiaVisible = true
    },
    /*分配权限关闭的操作*/
    handleAllocateClose() {
      this.allocateDiaVisible = false
    },
    /*点击了取消分配权限的弹出*/
    cancelAllocate() {
      this.allocateDiaVisible = false
    },
    /*点击了确定分配权限*/
    sureAllocate() {
      this.allocateDiaVisible = false
    },


    handAddBtn() {
      this.addDialogVisible = true
    },

    handleAddClose() {

    },
    cancelAddDialog() {
      this.addDialogVisible = false
    },

    confirmAddDialog() {
      this.addDialogVisible = false
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
