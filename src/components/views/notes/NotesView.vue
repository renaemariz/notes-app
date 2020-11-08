<template>
  <div class="container">
    <section class="content-header">
      <div class="row">
        <div class="col s6 left-align">
           <router-link to="/" class="btn waves-effect waves-light left-align"><i class="material-icons left">arrow_back</i>Notes</router-link>
        </div>
        <div class="col s6 right-align">
          <span>
            <label>
              <input type="checkbox" disabled class="filled-in" v-model="note.completed" />
              <span>Done</span>
            </label>
          </span>
        </div>
      </div>
      <h2>{{ note.title }}</h2>
    </section>

    <section class="content-body">
      <div class="row">
        <p class="left-align">{{ note.content }}</p>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotesView',
  data () {
    return {
      note: {}
    }
  },
  computed: {
    ...mapGetters(['getNoteById'])
  },  
  created () {
    const id = this.$route.params.id
    this.note = this.getNoteById(id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
