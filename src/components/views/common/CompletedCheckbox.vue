<template>
  <div class="checkbox-container">
    <span>
      <label>
        <input type="checkbox" class="filled-in" v-model="isChecked" @change="check()" />
        <span>Done</span>
      </label>
    </span>
  </div>
</template>
<script>

export default {
  name: 'CompletedCheckbox',
  props: ['checked'],
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    check() {
      this.$emit('checked', this.isChecked)
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