import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import "firebase/auth"
import db from '@/components/firebaseInit'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    notesList: []
  },
  plugins: [createPersistedState()],
  actions: {
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setNotes', null)
    },

    getNotes () {
      db.collection('notes').where('author', '==' , store.state.currentUser).get()
        .then(querySnapshot => {
          let notes = []
          querySnapshot.forEach(doc => {
             notes.push({id: doc.id, ...doc.data()})
          })
          store.commit('setNotes', notes)
        })
        .catch(err => console.log(err))
    },

    addNote ({ commit }, payload) {
      db.collection('notes').add(payload)
        .catch(err => console.log(err))
    },

    updateNote ({ commit }, payload) {
      db.collection('notes').doc(payload.id).update(payload.note)
        .then(() => commit('saveNote', payload))
        .catch(err => console.log(err))
    },

    deleteNote ({commit}, id) {
      db.collection("notes").doc(id).delete()
        .then(() => commit('removeNote', id))
        .catch(err => console.log(err))
    },

    isNoteCompleted ({commit}, payload) {
      db.collection('notes').doc(payload.id).update({completed: payload.completed})
        .then(() => commit('isCompletedNote', payload))
        .catch(err => console.log(err))
    }
  },
  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    },

    setNotes (state, notes) {
      state.notesList = notes
    },

    saveNote (state, updatedNote) {
      let index = state.notesList.findIndex(note => note.id === updatedNote.id)
      state.notesList[index].title = updatedNote.note.title
      state.notesList[index].content = updatedNote.note.content
    },

    isCompletedNote (state, updatedNote) {
      let index = state.notesList.findIndex(note => note.id === updatedNote.id)
      state.notesList[index].completed = updatedNote.completed
    },

    removeNote (state, id) {  
      let index = state.notesList.findIndex(note => note.id == id)    
      state.notesList.splice(index, 1)
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    notesList: state => state.notesList,
    notesFilterByCompletedStatus: (state) => (status) => {
      return state.notesList.filter(note => note.completed == status)
    }    
  }
})

export default store
