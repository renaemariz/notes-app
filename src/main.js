// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import './components/firebaseInit'

Vue.config.productionTip = false

/* eslint-disable no-new */
let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
