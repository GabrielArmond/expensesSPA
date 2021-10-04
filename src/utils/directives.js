import Vue from 'vue'
import { parseISO, format } from 'date-fns'

Vue.directive('money-format', (el, { value }) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2
  }).format(value || 0)
})

Vue.directive('date-format', (el, { value }) => {
  const firstDate = parseISO(value)
  el.innerHTML = format(firstDate, "dd '/' MM '/' YYYY ' às ' HH:mm:ss")
})
