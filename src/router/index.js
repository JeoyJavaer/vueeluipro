import Vue from 'vue'
import VueRouter from 'vue-router'
import User from "@/views/user/User";


const Login = () => import("@/views/Login");
const Home = () => import("@/views/home/Home");
const Categories = () => import("@/views/goods/Categories")
const Goods = () => import("@/views/goods/Goods")
const Params = () => import("@/views/goods/Params")
const Order = () => import("@/views/order/Order")
const Rights = () => import("@/views/power/Rights")
const Roles = () => import("@/views/power/Roles")
const Reports = () => import("@/views/reports/Reports")
const Welcome = () => import("@/views/Welcome")
const GoodsAdd = () => import("@/views/goods/GoodsAdd")


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
    component: Home,
    redirect: '/welcome',
    children: [
      // {
      //     path: '',
      //     redirect: '/welcome'
      // },
      {
        path: '/home',
        component: Welcome
      },
      {
        path: '/users',
        component: User,
      },
      {
        path: '/roles',
        component: Roles,
      },
      {
        path: '/rights',
        component: Rights,
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/categories',
        component: Categories,
      },
      {
        path: '/params',
        component: Params,
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path: '/orders',
        component: Order,
      },
      {
        path: '/reports',
        component: Reports,
      },
      {
        path: '/goods/add',
        component: GoodsAdd
      }

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //如果是登录页面则放行
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  //其他页面不含有token则强制跳转到登录页面
  if (!tokenStr) {
    return next('/login')
  } else {
    next()
  }
})

export default router
