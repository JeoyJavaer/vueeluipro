<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
          :stripe="true"
          border
          :data="rightsList">
        <el-table-column
            label="#"

            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="authName"
            label="权限名称"
        >
        </el-table-column>
        <el-table-column
            prop="path"
            label="路径"
        >
        </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'" class="right-level">一级</el-tag>
            <el-tag v-else-if="scope.row.level==='1'" class="right-level" type="success">二级</el-tag>
            <el-tag v-else class="right-level" type="warning">三级</el-tag>

          </template>
        </el-table-column>
      </el-table>
    </el-card>




  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightsList: [],

    }
  },

  created() {
    this.getRightList()
  },

  methods: {
    async getRightList() {
      const res = await this.$axios('rights/list')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return;
      }
      this.rightsList = res.data
    },


  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}

.right-level {
  width: 80px;
}
</style>
