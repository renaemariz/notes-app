<template>
  <div class="container">
    <section class="content-header">
      <div class="row">
        <div class="col s6 left-align">
         <router-link to="/" class="btn waves-effect waves-light left-align"><i class="material-icons left">arrow_back</i>Back</router-link>
        </div>
      </div>
    </section>
    <section class="content-body">
      <h2>Edit Note</h2>
      <div v-if="!note">
          <h4> {{msg}} </h4>
      </div>
      <div v-else>       
        <form @submit.prevent="editNote">
          <div class="row">
            <div class="col s6 left-align">
              <CompletedCheckbox class="checkbox-container" @checked="checkboxToggled($event)" :id="id" :checked="completed" />
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
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from '@/components/firebaseInit'
import CompletedCheckbox from '@/components/common/CompletedCheckbox'

export default {
  name: 'NotesUpdate',
  data () {
    return {
      note: '',
      msg: 'Note not Found',
      id: null,
      title: null,
      content: null,
      completed: null
    }
  },
  components: {
    CompletedCheckbox
  },
  async created () {
    this.id = this.$route.params.id
    this.note =  this.notesList.find(note => note.id === this.id)
    if(!this.note) return this.note = false

    //if note found set values 
    this.title = this.note.title
    this.content = this.note.content
    this.completed = this.note.completed
  },
  mounted() {
    M.textareaAutoResize($('#content'));
  },
  computed: {
    ...mapGetters(['notesList'])
  },
  methods: {
    ...mapActions(['isNoteCompleted', 'updateNote']),
    editNote () {
      let payload = {
        id: this.id,
        note: {
          title: this.title,
          content: this.content
        }
      }
      this.updateNote(payload).then(() => this.$router.push({ name: 'notes-view', params: { id: payload.id } }) )
    },
    checkboxToggled ({isChecked, id}) {
      this.isNoteCompleted({ id: id, completed: isChecked })
    }
  }
}
</script>