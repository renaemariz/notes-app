<template>
  <div class="container">
    <section class="content-header">
      <div class="row">
          <div class="col s6 left-align">
             <router-link to="/" class="btn waves-effect waves-light left-align"><i class="material-icons left">arrow_back</i>Back</router-link>
          </div>
      </div>
      <div v-if="!note">
        <h4> {{msg}} </h4>
      </div>
      <div class="row" v-if="note">     
        <div class="col s6 left-align">
          <router-link :to="{ name: 'notes-update', params: { id: note.id }}" class="btn"><i class="material-icons">edit</i></router-link>
          <DeleteBtn @delete="deleteItem" />
        </div>
        <div class="right-align col s6 ">
          <CompletedCheckbox class="checkbox-container" @checked="checkboxToggled($event)" :id="id" :checked="note.completed" />
        </div>
      </div>
    </section>

    <div v-if="note">
      <h4>{{ note.title }}</h4>
      <p class="left-align">{{ note.content }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from '@/components/firebaseInit'
import CompletedCheckbox from '@/components/common/CompletedCheckbox'
import DeleteBtn from '@/components/common/DeleteBtn'

export default {
  name: 'NoteItem',
  components: {
    CompletedCheckbox,
    DeleteBtn
  },
  data () {
    return {
      id: '',
      note: '',
      msg: ''
    }
  },
  created() {
    if(this.$route.params.id) {
      this.id = this.$route.params.id
      this.note =  this.notesList.find(note => note.id === this.id)
      if(!this.note) {
        this.msg = "Note Not Found"       
      }
    }
  },
  computed: {
    ...mapGetters(['notesList'])
  },
  methods: {
    ...mapActions(['isNoteCompleted', 'deleteNote', 'getNotes']),
    checkboxToggled ({isChecked, id}) {
      this.isNoteCompleted({ id: id, completed: isChecked })
    },
    deleteItem () {
      this.deleteNote(this.note.id).then(() => this.$router.push("/"))
    }
  }
}
</script>