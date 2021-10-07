<template>
    <div class="expense-list-item row">
      <div class="col-10">
        <div class="description">
          <span>{{ data.description }}</span>
          <button
          v-if="data.receipt"
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
        <small v-date-format="data.createAt"/>
      </div>
      <div class="col-2" v-money-format="data.value"/>
    </div>
</template>

<script>
export default {
  data: () => {
    return {
      expenses: []
    }
  },

  props: {
    data: { type: Object, required: true }
  },

  methods: {
    openReceipt () {
      window.open(this.data.receipt, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
