<template>
  <div class="home">
    <el-container>
      <el-header>
        <span home-div>后台管理系统</span>
        <img src="~assets/logo.png" alt="">
        <el-button type="info" @click="logout" class="logout-btn">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse? '64px':'200px'">
          <div class="collapse-btn" @click="collapseMenu">| | |</div>
          <el-menu
              :default-active="activePath"
              background-color="#545c64"
              text-color="#fff"
              :unique-opened="true"
              :collapse="isCollapse"
              :collapse-transition="false"
              router
              active-text-color="#0000ff">
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconList[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item @click="saveNavState('/'+subItem.path)" :index="'/'+subItem.path"
                            v-for="subItem in item.children" :key="subItem.id">
                <!-- 导航开启路由模式：
                将index值作为导航路由 -->
                <!-- 二级菜单的模板区域 -->
                {{ subItem.authName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

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
      menuList: [],
      iconList: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      activePath: ''
    }
  },

  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')

  },

  methods: {
    collapseMenu() {
      this.isCollapse = !this.isCollapse
    },

    getMenuList() {
      this.$axios.get('menus').then(res => {
        console.log('menulist' + res);
        this.menuList = res.data

      })
    },

    saveNavState(path) {
      console.log('saveNavState' + path);
      window.sessionStorage.setItem('activePath', path)

    },

    logout() {
      // window.sessionStorage.clear()
      // this.$router.push("/login")
    }
  }

}
</script>

<style scoped>
.home {
  background: #55585e;
  height: 100%;
  width: 100%;
}

.el-menu {
  border-right: none;
}

.el-header {
  display: flex;
  float: left;
  padding: 10px;

}

.logout-btn {
  width: 80px;
  height: 36px;
  padding: 2px;
}

.home-div {
  height: 56px;
  text-align: center;
}

.el-container {
  height: 100%;
}

.collapse-btn {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
