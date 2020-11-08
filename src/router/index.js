import Vue from 'vue'
import Router from 'vue-router'
import NotesCreate from '@/components/views/notes/NotesCreate'
import NotesUpdate from '@/components/views/notes/NotesUpdate'
import NotesList from '@/components/views/notes/NotesList'
import NotesView from '@/components/views/notes/NotesView'
import Login from '@/components/views/auth/Login'
import Register from '@/components/views/auth/Register'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'notes',
      component: NotesList,
      meta: { requiresAuth: true }
    },
    {
      path: '/notes/new',
      name: 'notes-create',
      component: NotesCreate,
      meta: { requiresAuth: true, title: 'New Note' }
    },
    {
      path: '/notes/edit/:id',
      name: 'notes-update',
      component: NotesUpdate,
      meta: { requiresAuth: true, title: 'Edit Note' }
    },
    {
      path: '/notes/view/:id',
      name: 'notes-view',
      component: NotesView,
      meta: { requiresAuth: true, title: 'View Note' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Register',
      name: 'register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const auth = firebase.auth().currentUser

  if (requiresAuth && !auth) next({ path: '/login' })
  else if (requiresAuth && auth) next()
  else if (!requiresAuth && !auth) next()
  else next()
})

const title = 'Notes App'
router.afterEach((to, from, next) => {
  document.title = title
  if(to.meta.title) document.title = to.meta.title
})


export default router
