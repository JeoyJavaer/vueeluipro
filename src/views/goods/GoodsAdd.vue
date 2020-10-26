<template>

  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="goods-add-breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-alert
        center
        class="alert-add"
        title="添加商品信息"
        type="info"
        show-icon>
    </el-alert>
    <el-card class="add-goods-cart">
      <el-steps :active="completeStep" finish-status="success" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsAdd",
  data(){
    return{
      completeStep:0
    }
  }

}
</script>

<style scoped>
.add-goods-cart,goods-add-breadcrumb,.alert-add{
  margin-top: 15px;
}


</style>