<template>
  <nav class="nav flex-column justify-content-between">
    <div>
      <router-link exact exact-active-class="active" v-for="(router, i) in routerLinks" :key="i" class="nav-link" :to="{ name: router.name }">

        <i class="fa" :class="`fa-${router.meta.icon}`"></i>
        &nbsp;
        {{ router.meta.title }}
      </router-link>

      <hr>

      <layout-new-expenses />
    </div>
    <layout-logout />
  </nav>
</template>

<script>
import LayoutLogout from './LayoutLogout.vue'
import LayoutNewExpenses from './LayoutNewExpenses.vue'

export default {
  components: {
    LayoutLogout,
    LayoutNewExpenses
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(r => r.name !== 'login')
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  margin-left: -15px;
  width: calc(100% + 24px);
  height: calc(100vh - 49px);
  .nav-link {
    color: var(--white);
    transition: .4s;
    &.active {
      color: var(--featured);
      background-color: transparent;
    }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }
}
</style>
