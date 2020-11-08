<template>
  <div class="container">
    <section class="content-header">
      <div class="row">
        <div class="col s6 left-align">
           <router-link to="/" class="btn waves-effect waves-light left-align"><i class="material-icons left">arrow_back</i>Notes</router-link>
        </div>
      </div>
    </section>

    <section class="content-body">
      <h2>Edit Note</h2>
      <form @submit.prevent="editNote">
        <div class="row">
          <div class="col s6 left-align">
            <span>
              <label>
                <input type="checkbox" class="filled-in checkbox" v-model="completed"  @change="check(id, $event)"/>
                <span>Done</span>
              </label>
            </span>
          </div>

          <div class="col s6 right-align">
            <button class="btn waves-effect waves-light" type="submit" name="action"><i class="material-icons">save</i></button>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="title" type="text" v-model="title" placeholder="Title" required>
          </div>
          <div class="col s12">
            <textarea id="content" v-model="content" class="materialize-textarea" placeholder="Note"></textarea>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from '@/components/firebaseInit'

export default {
  name: 'NotesUpdate',
  data () {
    return {
      id: null,
      title: null,
      content: null,
      completed: null
    }
  },
  computed: {
    ...mapGetters(['getNoteById'])
  },
  created () {
    this.id = this.$route.params.id
    const note = this.getNoteById(this.id)
    this.title = note.title
    this.content = note.content
    this.completed = note.completed
  },
  methods: {
    ...mapActions(['updateNote']),
    editNote () {
      let payload = {
        id: this.id,
        note: {
          title: this.title,
          content: this.content
        }
      }
      this.updateNote(payload)
    },
    check (id, e) {
      db.collection('notes').doc(id).update({
        completed: e.target.checked
      })
        .then(() => {
          this.$store.commit('saveNote', {
            id: id,
            completed: e.target.checked
          })
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
