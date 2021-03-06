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
    meta: {
      icon: 'home', title: 'Home'
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/home/Home')
  },
  {
    name: 'expenses-list',
    path: '/expenses-list',
    meta: {
      icon: 'list-ul', title: 'Lista Gastos'
    },
    component: () => import(
      /* webpackChunkName: "lista-gastos" */ '../pages/expenses-list/ExpensesList'
    )
  },
  {
    name: 'filter-list',
    path: '/filter-list',
    meta: {
      icon: 'filter', title: 'Pesquisa Gastos'
    },
    component: () => import(
      /* webpackChunkName: "filter-list" */ '../pages/filter-list/FilterList'
    )
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../pages/login/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Expenses`

  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
