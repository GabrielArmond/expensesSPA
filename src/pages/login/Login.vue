<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Expenses</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input required type="email" v-model="email" class="form-control" placeholder="E-mail">
        </div>
        <div class="form-group">
          <input required type="password" v-model="password" class="form-control" placeholder="Senha"/>
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          <template v-if="loading">
            Entrando ... &nbsp;
            <i class="fas fa-spinner fa-spin"></i>
          </template>
          <template v-else>
          Entrar
          &nbsp;
          <i class="fas fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      loading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      const { email, password } = this
      try {
        const response = await this.$firebase.auth().signInWithEmailAndPassword(email, password)

        // comando para verificar se o usuario esta logado
        window.uid = response.user.uid

        // da um push para aba de Home
        this.$router.push({ name: 'home' })
      } catch (err) {
        return err
      }

      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card{
    width: 30%;
    color: var(--darker)
  }
  input {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 18pt;
  }
}
</style>
