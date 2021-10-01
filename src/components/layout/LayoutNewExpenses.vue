<template>
<div class="w-100 d-flex justify-content-center">
  <button @click="showModal = true" class="btn btn-lg btn-outline-primary w-75">
    <i class="fa fa-plus"></i>
    &nbsp;
    Novo gasto
  </button>

  <div class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
          <button type="button" @click="closeModal()" class="btn-close">
          </button>
        </div>
        <div class="modal-body">
          <p>Woohoo, you're reading this text in a modal!</p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="closeModal()" class="btn btn-secondary">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade" :style="{ display: showModal ? 'block' : 'none' }" :class="{ show: showModal }"></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style scoped>

</style>
