import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// codigo para resolver erro de redundancia
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/home/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../pages/login/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
