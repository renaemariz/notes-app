import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import "firebase/auth"
import db from '@/components/firebaseInit'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
  }
})

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
      db.collection('notes').get()
        .then(querySnapshot => {
          let notes = []
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              completed: doc.data().completed
            }
            notes.push(data)
          })
          store.commit('setNotes', notes)
        })
    },
    addNote ({ commit }, payload) {
      let note = {
        title: payload.title,
        content: payload.content,
        completed: false
      }
      db.collection('notes').add(note)
        .then(doc => {
          commit('addNewNote', note)
          router.push('/')
        })
        .catch(err => console.log(err))
    },
    updateNote ({ commit }, payload) {
      db.collection('notes').doc(payload.id).update(payload.note)
        .then(doc => {
          commit('saveNote', payload)
          router.push({name: 'notes-view', params: { id: payload.id }})
        })
        .catch(err => console.log(err))
    },
    deleteNote ({commit}, id) {
      db.collection('notes').doc(id).get()
        .then(doc => {
          doc.ref.delete()
             .then(() => commit('removeNote', id))
             .catch(err => console.log(err))
        })
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
    addNewNote (state, note) {
      state.notesList.push(note)
    },
    saveNote (state, newNote) {
     Object.assign(state.notesList.find(note => note.id === newNote.id), newNote.note)
    },
    removeNote (state, id) {  
      let index = state.notesList.findIndex(note => note.id == id)      
      state.notesList.splice(index, 1)
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    notesList: state => state.notesList,
    getNoteById: (state) => (id) => {
      return state.notesList.find(note => note.id === id)
    },
    notesFilterByCompletedStatus: (state) => (status) => {
      return state.notesList.filter(note => note.completed == status)
    }    
  }
})

export default store
