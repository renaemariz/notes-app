<template>
  <div class="container">
    <section class="content-body">
      <h2>Edit Note</h2>
      <form @submit.prevent="editNote">
        <div class="row">
          <div class="col s6 left-align">
            <CompletedCheckbox @checked="check" :checked="completed" />
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
import CompletedCheckbox from '../common/CompletedCheckbox'

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
  components: {
    CompletedCheckbox
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
  mounted() {
    M.textareaAutoResize($('#content'));
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
    check: function(isChecked) {
      this.isNoteCompleted({ id: this.id, completed: isChecked })
    }
  }
}
</script>