<template>
  <div class="filters">
    <div class="title">
      <h1>Filtro de gastos</h1>
      <hr>
    </div>
    <div class="search-bar">
      <label class="form-label">Procure sua despesa: </label>
      <div class="form-group">
        <input v-model="search" class="form-control" type="search" placeholder="Search..." />
        <div class="search-button">
          <button @click="filterExpenses()" class="btn btn-outline-primary" type="button">Buscar</button>
        </div>
      </div>
    </div>
    <div v-for="(itens, index) in data" :key="index" class="expense-list-item row">
      <div class="col-10">
        <div class="description">
          <span>{{ itens.description }}</span>
          <button
          v-if="itens.receipt"
          @click="openReceipt()"
          class="btn btn-sm btn-outline-primary"
          >
          <i class="fa fa-paperclip"></i>
          &nbsp;
          Ver comprovante
          &nbsp;
          <i class="fa fa-external-link-alt"></i>
          </button>
          </div>
        <small v-date-format="itens.createAt"/>
      </div>
      <div class="col-2" v-money-format="itens.value"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',

  data: () => {
    return {
      expenses: [],
      search: ''
    }
  },

  created () {
    this.getData()
  },

  props: {
    data: { type: Object, required: true }
  },

  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },

    filterExpenses () {
      this.data = this.expenses.filter((valorAtual) => {
        return valorAtual.description.includes(this.search)
      })

      return this.data
    },

    openReceipt () {
      window.open(this.data.receipt, '_blank')

      console.log(this.data.receipt)
    }
  }
}
</script>

<style scoped lang="scss">
.filters{
  .title {
    margin: 5px;
  }
  .search-bar {
    width: 100%;
    margin-bottom: 10px;
    .search-button {
      margin-top: 10px;
    }
  }
  .expense-list-item {
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--dark-medium);
      .description {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
}
</style>
