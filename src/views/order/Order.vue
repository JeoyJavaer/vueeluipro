<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 15px">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 15px">
      <el-row>
        <el-col :span="6">
          <el-input v-model="queryInfo.query" placeholder="请输入内容">
            <i
                class="el-icon-search"
                slot="suffix"
                @click="searchClick">
            </i></el-input>
        </el-col>
      </el-row>
      <el-table
          border
          :data="orderList"
          style="width: 100%">
        <el-table-column
            label="#"
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="order_number"
            label="订单编号" >
        </el-table-column>
        <el-table-column

            prop="order_price"
            label="订单价格">
        </el-table-column>
        <el-table-column

            prop="pay_status"
            label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status==='1'" type="primary">已支付</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="is_send"

            label="是否发货">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="下单时间">
          <template slot-scope="scope">
            {{scope.row.create_time | dataFormat}}
          </template>

        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
                size="mini"
                icon="el-icon-edit"
                @click="editClick( scope.row)">
            </el-button>
            <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteClick(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.queryInfo.pagenum"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="this.queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total">
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
import {myMixin} from "@/plugins/mix";

export default {
  name: "Order",
  mixins: [myMixin],
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        user_id: '',

      },
      total: 0,


      orderList: []

    }
  },

  created() {
    this.getOrderList()
  },

  methods: {
    async getOrderList() {
      const res = await this.$axios({
        url: '/orders',
        params: {
          'query': this.queryInfo.query,
          'pagenum': this.queryInfo.pagenum,
          'pagesize': this.queryInfo.pagesize,
          'user_id': this.queryInfo.user_id
        }
      })
      if (res.meta.status === 200) {
        this.orderList = res.data.goods
        this.total = res.data.total
        this.queryInfo.pagenum = res.data.pagenum
      }
    },

    searchClick() {

    },

    editClick(row){

    },

    deleteClick(row){

    },

    handleSizeChange(size){
      this.queryInfo.pagesize=size
      this.getOrderList()
    },

    handleCurrentChange(pagenum){
      this.queryInfo.pagenum=pagenum
      this.getOrderList()
    }

  }
}
</script>

<style scoped>

</style>
