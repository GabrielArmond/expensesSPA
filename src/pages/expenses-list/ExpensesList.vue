<template>
  <div>
    <div class="months-navigation">
      <div
        :key="i"
        class="month-link"
        @click="setActiveMonth(month)"
        v-for="(month, i) in groupedMonths"
        :class="{active: month.month == activeMonth.month}"
        >
        <div class="month-label">{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total"/>
      </div>
    </div>
    <div class="container-group">
      <div class="container">
        <div v-if="activeMonth.data && !activeMonth.data.length">
          Você nao cadastrou nenhum gasto neste mês
        </div>
        <template v-else>
        <expense-list-item
          :key="index"
          :data="item"
          v-for="(item, index) in activeMonth.data"
        />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import ExpenseListItem from './ExpenseListItem'

export default {
  name: 'ListaGastos',

  data: () => ({
    expenses: [],
    activeMonth: {}
  }),

  components: {
    ExpenseListItem
  },

  created () {
    this.getData()
  },

  mounted () {
    this.setActiveMonth()
  },

  computed: {
    groupedMonths () {
      let groupedMonths = []

      const currentMonth = moment().format('MM/YYYY')

      // adicionar mes atual na array vazia
      const addCurrentMonth = () => {
        if (!currentMonth) {
          groupedMonths.push({
            data: [],
            total: 0,
            month: moment().format('MM/YYYY')
          })
        } else {
          return []
        }
      }

      if (this.expenses.length) {
        const months = groupBy(this.expenses, i => {
          return moment(i.createAt).format('MM/YYYY')
        })

        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY HH'

          return moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))
            ? -1
            : +1
        })

        groupedMonths = sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => +i.value).reduce((a, c) => a + c, 0)
        }))

        // Pegar o ultimo mes da array
        const lastMonth = moment(groupedMonths[groupedMonths.length - 1].month, 'MM/YYYY')

        // Verifica se o objeto lastMonth nao é igual a data atual (moment()) se é igual ao mes
        if (!lastMonth.isSame(moment(), 'month')) {
          addCurrentMonth()
        }
      } else {
        addCurrentMonth()
      }

      return groupedMonths
    }
  },

  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },

    setActiveMonth (month = null) {
      this.activeMonth = month || this.groupedMonths[this.groupedMonths.length - 1]
    }
  }
}
</script>

<style scoped lang="scss">
.months-navigation {
  display: flex;
  width: calc(100% + 24px);
  margin-left: -12px;
  background-color: var(--featured-dark);
  .month-link {
    padding: 15px;
    cursor: pointer;
    transition: .4s;
    text-align: center;
    &:hover {
      background-color: var(--featured);
    }
    &.active {
      background-color: var(--featured);
    }
    .value-label {
      color: var(--darker);
      font-size: 8pt;
      font-weight: 500;
    }
  }
}

.container-group {
  margin-left: -12px;
  overflow: hidden auto;
  height: calc(100vh - 70px);
  width: calc(100% + 24px);
  .container {
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 15pt;
  }
}
</style>
