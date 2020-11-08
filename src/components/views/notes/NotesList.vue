<template>
  <div class="container">
    <section class="content-header">
      <h2>Notes</h2>
      <div class="valign-wrapper row">
        <div class="col s6 m6">
         <div class="input-field col s12">
            <select @change="filterBy($event)">
              <option value="all" selected>All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <label>Filter by</label>
          </div>
        </div>
        <div class="col s6 m6 right-align">
          <router-link to="/notes/new" class="btn-floating btn-large  waves-effect waves-light red"><i class="material-icons" aria-hidden="true">add</i></router-link>
        </div>
      </div>
    </section>

    <section class="content-body">
      <div class="row" v-if="notes">
        <div class="col s12 m6" v-for="note in notes" :key="note.id">
          <div class="card blue-grey lighten-5">
            <div class="right-align checkbox-container">
              <span>
                <label>
                  <input type="checkbox" class="filled-in" v-model="note.completed" @change="check(note.id, $event)" />
                  <span>Done</span>
                </label>
              </span>
            </div>
            <div class="card-content left-align">
              <span class="card-title">{{ note.title }}</span>
              <p>{{ note.content }}</p>
            </div>
            <div class="card-action">
              <div class="row">
                  <div class="col s8 left-align">
                    <router-link :to="{ name: 'notes-view', params: { id: note.id }}" class="btn"><i class="material-icons">remove_red_eye</i></router-link>
                    <router-link :to="{ name: 'notes-update', params: { id: note.id }}" class="btn"><i class="material-icons">edit</i></router-link>
                  </div>
                  <div class="col s4 right-align">
                    <button class="btn red" @click="confirmDelete(note.id)"><i class="material-icons">delete</i></button>
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

export default {
  name: 'NotesList',
  data () {
    return {
      notes: []
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
    }
  },
  methods: {
    ...mapActions(['deleteNote', 'getNotes']),
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
    filterBy (e) {
      this.notes = []
      const value = e.target.value
      if (value === 'all') {
        this.notes = this.notesList
        return
      }

      let isCompleted = (value === 'completed')
      this.notes = this.notesFilterByCompletedStatus(isCompleted)
    },
    confirmDelete (id) {
      if (confirm('Are you sure to delete?')) {
        this.deleteNote(id)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #white;
}
.checkbox-container {
  padding: 10px;
}
</style>
