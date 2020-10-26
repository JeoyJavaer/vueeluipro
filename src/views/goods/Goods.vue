<template>
  <!--  商品列表-->
  <div>
    <el-card>
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row class="search-box" :gutter="10">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input
                placeholder="请输入内容"
                v-model="query"
                clearable
                @change="inputSearch"
            ></el-input>

          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addGoodsClick">添加</el-button>
          </el-col>

        </el-row>
        <el-table
            class="user-list-table"
            :stripe="true"
            border
            :data="goods">
          <el-table-column
              type="index"
              label="#"
              width="40">
          </el-table-column>
          <el-table-column
              prop="goods_name"
              min-width="250"
              label="商品名称">
          </el-table-column>
          <el-table-column
              prop="goods_price"
              width="120"
              label="商品价格(元)"  >
          </el-table-column>
          <el-table-column
              width="100"
              prop="goods_weight"
              label="商品重量">
          </el-table-column>
          <el-table-column
              prop="goods_number"
              width="100"
              label="商品数量">
          </el-table-column>
          <el-table-column
              width="180"
              prop="add_time"
              label="创建时间">
            <template slot-scope="scope">
              {{scope.row.add_time | dataFormat}}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="editClick(scope.$index, scope.row)">
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteClick(scope.$index, scope.row)">
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
  </div>
</template>

<script>
import {myMixin} from '@/plugins/mix'

export default {
  name: "Goods",
  mixins:[myMixin],
  created() {
    this.getGoodsList()
  },

  data() {
    return {
      goods: [],
      query: '',
      pagenum: 1,
      pagesize: 5,
      totalItem: 0,
    }
  },
  methods: {
    async getGoodsList() {
      const res = await this.$axios.get('/goods', {
        params: {
          'query': this.query,
          'pagenum': this.pagenum,
          'pagesize': this.pagesize
        }
      })
      this.goods = res.data.goods
      this.totalItem = res.data.total
      this.pagenum = Number(res.data.pagenum)
    },

    inputSearch(value){

      this.query = value
      this.getGoodsList()
    },

    editClick(index,row){

    },

    async doDeleteGoodsItem(id){
      const  res= await this.$axios.delete('/goods/'+id)
      if (res.meta.status===200){
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
       await this.getGoodsList()
      }
    },

    deleteClick(index,row){
      this.$confirm('确定删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDeleteGoodsItem(row.goods_id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    handleSizeChange(pagesize){
      console.log(pagesize);
      this.pagesize = pagesize
      this.getGoodsList()
    },
    handleCurrentChange(pagenum){
      console.log(pagenum);
      this.pagenum = pagenum
      this.getGoodsList()
    },

    addGoodsClick(){
      this.$router.push('/goods/add')
    }




  }
}
</script>

<style scoped>
.search-box{
  margin-top: 15px;
}

.user-list-pagination{
  margin-top: 15px;
}

</style>
