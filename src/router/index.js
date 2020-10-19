import Vue from 'vue'
import VueRouter from 'vue-router'


const Login = () => import("@/views/Login");
const Home = () => import("@/views/home/Home");


Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push
// //修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   //如果是登录页面则放行
//   if (to.path === 'login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   //其他页面不含有token则强制跳转到登录页面
//   if (!tokenStr) {
//     return next('/login')
//   } else {
//     next()
//   }
// })

export default router
