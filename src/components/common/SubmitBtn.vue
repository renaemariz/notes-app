<template>
  <button class="btn waves-effect waves-light" type="submit" name="action" :disabled="submitBtn.loading">
    {{ submitBtn.loading ? 'Loading..' : submitBtn.value }}
  </button>
</template>
<script>

export default {
  name: 'submit-btn',
  props: ['submitBtn']
}
</script>