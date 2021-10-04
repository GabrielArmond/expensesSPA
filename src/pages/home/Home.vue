<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>Você gastou</small>
        <div class="money" v-money-format="totals.totalSpent"/>
        <small>em {{ totals.countBuy }} compras</small>
      </div>
      <div class="col-6 home-box">
        <small>A média de gastos é de</small>
        <div class="money" v-money-format="totals.average"/>
      </div>
      <div class="col-6 home-box">
        <small>A maior gasto foi de</small>
        <div class="money" v-money-format="totals.biggest.value"/>
        <small>Com</small>
        <div class="description">
          {{ totals.biggest.description }}
        </div>
        <small v-date-format="totals.biggest.createAt"/>
      </div>
      <div class="col-6 home-box">
        <small>A menor gasto foi de</small>
        <div class="money" v-money-format="totals.lowest.value"/>
        <small>Com</small>
        <div class="description">
          {{ totals.lowest.description }}
        </div>
        <small>No dia 10/11/2019</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    expenses: []
  }),

  created () {
    this.getData()
  },

  computed: {
    totals () {
      const { expenses: exp } = this
      const values = {
        totalSpent: 0,
        average: 0,
        biggest: {},
        lowest: {},
        countBuy: 0
      }

      if (exp.length) {
        // percorre a array de values e jogando os valores de cada item em uma array
        values.totalSpent = exp.map(e => parseFloat(e.value))
          .reduce((acc, cur) => acc + cur, 0) // acc = acumulador // cur = current (valor atual do array) // pega o valor atual e soma no acumulador
      }

      values.average = values.totalSpent / exp.length

      // com a funçao sort colocamos que se a for maior que b entao ordene do maior para o menor, pegando o index 0 para saber o maior value
      values.biggest = exp.sort((a, b) => parseFloat(b.value - a.value))[0]

      values.lowest = exp.sort((a, b) => parseFloat(a.value - b.value))[0]

      values.countBuy = exp.length

      return values
    }
  },

  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  .home-box {
    width: 50%;
    font-size: 30pt;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(50vh - 15px);
    border: 1px solid var(--dark-medium);
    small {
      font-size: 1.3rem;
    }
    &:nth-child(2), &:nth-child(4) {
      border-left: none;
    }
    &:nth-child(3), &:nth-child(4)  {
      border-top: none;
    }
    .money {
      color: var(--featured)
    }
    .description {
      color: var(--featured)
    }
  }
}
</style>
