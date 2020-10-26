<template>
  <!--  商品分类-->
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="search-box" :gutter="10">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addCategoryClick">添加</el-button>
          </el-col>
        </el-row>
        <tree-table
            class="category-table"
            :stripe="true"
            border
            show-index
            :selection-type="false"
            :columns="columns"
            :expand-type="false"
            :data="categories">
          <template slot="isValidate" slot-scope="scope">
            <i class="el-icon-success"
               v-if="scope.row.cat_deleted === false"
               style="color: lightgreen"></i>
          </template>
          <el-table-column
              prop="cat_name"
              label="分类名称">
          </el-table-column>
          <el-table-column
              width="80"
              prop="cat_deleted"
              label="是否有效">

          </el-table-column>

          <template slot="sort" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0" class="right-level">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level===1" class="right-level" type="success">二级</el-tag>
            <el-tag v-else class="right-level" type="warning">三级</el-tag>
          </template>

          <template slot="operate" slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editClick(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteClick(scope.$index, scope.row)">删除
            </el-button>
          </template>

        </tree-table>

        <el-pagination
            class="category-list-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2,  5, 10]"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper,sizes"
            :total="totalItem">
        </el-pagination>

      </div>
    </el-card>
    <!--编辑分类-->
    <el-dialog
        title="编辑分类"
        :visible.sync="isEditDiaVisible"
        width="50%">
      <el-form :model="editCategory" :rules="editCategoryRules" ref="editCategoryForm" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCategory.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDiaCancel">取 消</el-button>
    <el-button type="primary" @click="editDiaSure">确 定</el-button></span>
    </el-dialog>

    <!--添加分类-->
    <el-dialog
        title="添加分类"
        :visible.sync="isAddDiaVisible"
        width="50%">
      <el-form :model="addCategory" :rules="addCategoryRules" ref="addCategoryForm" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCategory.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-input v-model="addCategory.cat_pid"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDiaCancel">取 消</el-button>
    <el-button type="primary" @click="addDiaSure">确 定</el-button></span>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: "Categories",

  data() {
    return {
      categories: [],
      type: 3,
      pagenum: 1,
      pagesize: 5,
      totalItem: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isValidate',

        },
        {
          label: '排序',
          type: 'template',
          template: 'sort',
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate'
        }
      ],

      isAddDiaVisible: false,
      addCategory: {
        cat_name: '',
        cat_id: 0,
        cat_pid: 0,
        cat_level: 0
      },
      addCategoryRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],

      },

      isEditDiaVisible: false,
      editCategory: {
        cat_name: '',
        cat_id: 0,

      },
      editCategoryRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],

      }
    }
  },

  created() {
    this.getCategoryList()
  },


  methods: {
    async getCategoryList() {
      const res = await this.$axios.get('/categories', {
        params: {
          'type': this.type,
          'pagenum': this.pagenum,
          'pagesize': this.pagesize
        }
      })

      this.categories = res.data.result
      this.totalItem = res.data.total
      this.pagesize = res.data.pagesize
      this.pagenum = res.data.pagenum
    },

    inputSearch(value) {

      this.query = value
      this.getCategoryList()
    },

    editClick(index, row) {
      this.editCategory.cat_id = row.cat_id
      this.editCategory.cat_name = row.cat_name
      this.isEditDiaVisible = true
    },


    addDiaCancel() {
      this.isAddDiaVisible = false
      this.addCategory = {
        cat_name: '',
        cat_id: 0,
        cat_pid: 0,
        cat_level: 0
      }
    },

    addDiaSure() {
      this.$refs.addCategoryForm.validate((validate) => {
        if (validate) {
          this.doAddCategoryHttp()
        }
      })
    },

    async doAddCategoryHttp() {
      const res = await this.$axios.post('/categories/', this.addCategory);
      console.log(res);
      if (res.meta.status === 201) {
        await this.getCategoryList()
        this.$message.success(res.meta.msg)
        this.addDiaCancel()
      } else {
        this.$message.error(res.meta.msg)
      }
    },

    editDiaCancel() {
      this.isEditDiaVisible = false
      this.editCategory = {
        cat_name: '',
        cat_id: 0
      }
    },

    editDiaSure() {
      this.$refs.editCategoryForm.validate((validate) => {
        if (validate) {
          this.doEditCategoryHttp()
        }
      })
    },

    async doEditCategoryHttp() {
      const res = await this.$axios.put('/categories/' + this.editCategory.cat_id, {
        'cat_name': this.editCategory.cat_name
      });
      console.log(res);
      if (res.meta.status === 200) {
        await this.getCategoryList()
        this.$message.success(res.meta.msg)
        this.editDiaCancel()
      } else {
        this.$message.error(res.meta.msg)
      }
    },


    async doDeleteCategoryItem(row) {
      console.log(row);
      const res = await this.$axios.delete('categories/' + row.cat_id)
      if (res.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.getCategoryList()
      } else {
        this.$message.error(res.meta.msg)
      }
    },

    deleteClick(index, row) {
      this.$confirm('确定删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDeleteCategoryItem(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    handleSizeChange(pagesize) {
      console.log(pagesize);
      this.pagesize = pagesize
      this.getCategoryList()
    },
    handleCurrentChange(pagenum) {
      console.log(pagenum);
      this.pagenum = pagenum
      this.getCategoryList()
    },

    addCategoryClick() {
      this.isAddDiaVisible = true
    }


  }
}
</script>

<style scoped>
.search-box, .category-list-pagination, .category-table {
  margin-top: 15px;
}


</style>
