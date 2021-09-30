<template>
  <div id="app">
    <base-spinner />
    <router-view />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner.vue'

export default {
  name: 'App',
  components: {
    BaseSpinner
  },
  mounted () {
    // toda vez que o usuario logar ou deslogar, este comando vai ser chamado
    this.$firebase.auth().onAuthStateChanged(user => {
      // se user for verdadeiro user = uid, senao user = null
      window.uid = user ? user.uid : null
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
  min-height: 100vh;
  color: var(--light)
}
</style>
