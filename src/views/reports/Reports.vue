<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 15px">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 15px">
      <div id="echartsContainer" style="width: 750px;height:400px;"></div>

    </el-card>

  </div>
</template>

<script>
import echarts from 'echarts'
import _ from 'lodash'

export default {
  name: "Reports",
  data() {

    return {
      cusEcharts: {},
      options: {


        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },

  async mounted() {
    await this.initEcharts()
  },

  methods: {

    async initEcharts() {
      this.cusEcharts = echarts.init(document.getElementById('echartsContainer'));

      const res = await this.$axios.get('/reports/type/1')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }

      const terOptions = _.merge(res.data, this.options)
      console.log(terOptions);
      this.cusEcharts.setOption(terOptions)
    }

  }
}
</script>

<style scoped>

</style>
