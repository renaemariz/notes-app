<template>
  <div class="container">
    <section class="content-header">
      <div class="row">
        <div class="col s6 left-align">
           <router-link to="/" class="btn waves-effect waves-light left-align"><i class="material-icons left">arrow_back</i>Back</router-link>
        </div>
      </div>
      <h2>New Note</h2>
    </section>

    <section class="content-body">
      <form @submit.prevent="createNote">
        <div class="row">
          <div class="col s12 right-align">
             <button class="btn waves-effect waves-light" type="submit" name="action"><i class="material-icons">save</i></button>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <input id="title" type="text" v-model="title" placeholder="Title" required>
          </div>
          <div class="col s12">
            <textarea multi-line id="content" v-model="content" class="materialize-textarea" placeholder="Note"></textarea>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NotesCreate',
  data () {
    return {
      title: null,
      content: null
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['addNote']),
    createNote () {
      let note = {
        author: this.currentUser,
        title: this.title,
        content: this.content,
        completed: false
      }
      this.addNote(note).then(() => this.$router.push("/"))
    }
  }
}
</script>