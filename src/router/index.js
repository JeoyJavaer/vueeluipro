import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/home/Login";


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path: 'login',
    component:Login
  }

]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to,from,netx)=>{
  if (to.path==='login')return next()
  const tokenStr =window.sessionStorage.getItem('token')
  if (!tokenStr) return  next('/login')
})

export default router
