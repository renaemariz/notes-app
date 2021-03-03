<template>
  <button class="btn red" @click="confirmDelete"><i class="material-icons">delete</i></button>
</template>
<script>

export default {
  name: 'delete-btn',
  data () {
    return {
    }
  },
  methods: {
    confirmDelete () {
      if (confirm('Are you sure to delete?')) {
        this.$emit('delete')
      }
    }
  },
  created () {
  }
}
</script>