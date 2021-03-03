<template>
  <div class="container">
    <section class="content-header">
      <h2>Notes</h2>
      <div class="valign-wrapper row">
        <div class="col s6 m4 left-align">
         <div class="input-field col s12">
            <select @change="filterBy($event)" v-model="filterByValue">
              <option value="all" selected>All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <label>Filter by</label>
          </div>
        </div>
        <div class="col s6 m8 right-align">
          <router-link to="/notes/new" class="btn-floating btn-large  waves-effect waves-light"><i class="material-icons" aria-hidden="true">add</i></router-link>
        </div>
      </div>
    </section>

    <section class="content-body">
      <div v-if="loading">
        <h2> Loading.. </h2>
      </div>
      <div v-if="notes.length == 0 && !loading">
        <h2> No Notes Found </h2>
      </div>
      <div class="row" v-if="notes">
        <div class="col s12 m6" v-for="note in notes" :key="note.id">
          <div class="card blue-grey lighten-5">
            <div class="card-content left-align">  
              <div class="right-align">
                <CompletedCheckbox @checked="checkboxToggled($event)" :id="note.id" :checked="note.completed" />
              </div>

              <div>
                <h4 class="truncate">{{ note.title }}</h4>
                <p class="truncate left-align">{{ note.content }}</p>
              </div>
            </div>
            <div class="card-action">
              <div class="row">
                  <div class="col s8 left-align">
                    <router-link :to="{ name: 'notes-view', params: { id: note.id }}" class="btn"><i class="material-icons">remove_red_eye</i></router-link>
                    <router-link :to="{ name: 'notes-update', params: { id: note.id }}" class="btn"><i class="material-icons">edit</i></router-link>
                  </div>
                  <div class="col s4 right-align">
                    <DeleteBtn @delete="deleteItem(note.id)" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from '@/components/firebaseInit'
import DeleteBtn from '@/components/common/DeleteBtn'
import CompletedCheckbox from '@/components/common/CompletedCheckbox'
import NoteItem from './NoteItem'

export default {
  name: 'NotesList',
  components: {
    NoteItem,
    DeleteBtn,
    CompletedCheckbox
  },
  data () {
    return {
      notes: [],
      loading: true,
      filterByValue: 'all'
    }
  },
  computed: {
    ...mapGetters(['notesList', 'notesFilterByCompletedStatus'])
  },
  created () {
    this.getNotes()
    $(document).ready(function() {
      $('select').formSelect()
    })
  },
  watch: {
    notesList(newValue, oldValue) {
      this.notes = newValue
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['isNoteCompleted', 'deleteNote', 'getNotes']),
    filterBy () {
      this.notes = []
      if (this.filterByValue === 'all') {
        this.notes = this.notesList
        return
      }
      // pending is equivalent to completed: false
      this.notes = this.notesFilterByCompletedStatus((this.filterByValue === 'completed'))
    },
    deleteItem (id) {
      this.deleteNote(id)
    },
    checkboxToggled ({isChecked, id}) {
     this.isNoteCompleted({ id: id, completed: isChecked })
    }
  }
}
</script>
<style>
.checkbox-container {
    padding: 10px;
}
</style>