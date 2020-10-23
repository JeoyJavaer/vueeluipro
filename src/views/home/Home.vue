<template>
  <div class="home">
    <el-container>
      <el-header class="home-header">
        <img src="~assets/logo.png" alt="">
        <div class="home-div">
          <span>爱逛街后台管理系统</span>
        </div>
        <div class="logout-btn">
          <el-button type="info" @click="logout" class="logout-btn">退出登录</el-button>
        </div>
      </el-header>
      <el-container class="home-nav">
        <el-aside :width="isCollapse? '64px':'200px'" class="home-aside">
          <div class="collapse-btn" @click="collapseMenu">| | |</div>
          <el-menu
              :default-active="activePath"
              background-color="#3e4653"
              text-color="#fff"
              :unique-opened="true"
              :collapse="isCollapse"
              :collapse-transition="false"
              router
              active-text-color="#3F9DFE">
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

        <el-main class="content">
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
        '125': 'el-icon-s-custom',
        '103': 'el-icon-s-cooperation',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-shopping-cart-1',
        '145': 'el-icon-s-marketing'
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
  /*height: 80%;*/

}

.el-menu {
  border-right: none;
}

.el-header {
  display: flex;
  float: left;
  padding: 0px;
  /*padding: 10px;*/

}

.logout-btn {
  width: 80px;
  height: 36px;
  padding: 2px;
  float: right;
  vertical-align: middle;
  margin: auto 15px auto auto;
}

.home-div {
  /*height: 56px;*/
  flex: 1;
  align-items: center;
  text-align: center;
  font-size: 32px;
  margin: auto;
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


.home-header {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 60px;
  background: #3e4653;
}

.home-nav {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 20px;
}

.home-aside {
  background: #3e4653;
}


</style>
