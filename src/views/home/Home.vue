<template>
  <div class="home">
    <el-container>
      <el-header>
        <div>
          <div>
            <img src="~assets/logo.png" alt="">
          </div>

          <el-button type="info">退出登录</el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <div @click="collapseMenu">| | |</div>
          <el-menu
              :default-active="defaultActive+''"
              background-color="#545c64"
              text-color="#fff"
              :unique-opened="true"
              :collapse="isCollapse"
              :collapse-transition="false"
              active-text-color="#0000ff">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航二</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航三</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航四</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      defaultActive: 0,
    }
  },

  created() {

  },

  methods: {
    collapseMenu() {
      this.isCollapse = !this.isCollapse

    }
  }

}
</script>

<style scoped>
.home {
  background: #55585e;
  height: 100Vh;
}

.el-menu {
  border-right: none;
}

.el-header {
  display: flex;
}

</style>