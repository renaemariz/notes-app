<template>
  <div class="checkbox-container">
    <span>
      <label>
        <input type="checkbox" class="filled-in " v-model="isChecked" @change="check()" />
        <span>Done</span>
      </label>
    </span>
  </div>
</template>
<script>

export default {
  name: 'CompletedCheckbox',
  props: ['checked', 'id'],
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    check() {
      console.log(this.isChecked)
      let isChecked = this.isChecked
      let id = this.id
      this.$emit('checked', {isChecked, id} )
    }
  },
  created () {
    this.isChecked = this.checked
  }
}
</script>

<style>
.checkbox-container {
  padding: 10px;
}
</style>