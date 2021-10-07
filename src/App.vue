<template>
  <div id="app">
    <base-spinner />
    <layout-notification />
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">Expenses</h1>
          <layout-navigation />
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>

    <router-view v-else/>
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner.vue'
import LayoutNotification from './components/layout/LayoutNotification.vue'
import LayoutNavigation from './components/layout/LayoutNavigation.vue'

export default {
  name: 'App',
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification
  },
  data: () => ({ isLogged: false }),
  mounted () {
    // toda vez que o usuario logar ou deslogar, este comando vai ser chamado
    this.$firebase.auth().onAuthStateChanged(user => {
      // se user for verdadeiro user = uid, senao user = null
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      // se usuario existir, vai para o home, senao volta para o login
      this.$router.push({ name: window.uid ? 'home' : 'login' })

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">
#app {
  background-color: var(--darker);
  min-height: 100vh 100vv;
  color: var(--light);
  .navigation-sidebar {
    background-color: var(--dark-medium);
  }
  .app-title {
    font-size: 20pt;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
