<template>
  <div id="app">
    <div class="container">
      <div id="nav" v-if="currentUser" class="row">
        <div class="col s4 left-align">
          <router-link to="/">Notes</router-link>   
        </div>
        <div class="col s8 right-align">
          <span> ({{ currentUser }}) </span>
          <router-link to="/login" event="" @click.native.prevent="logout">Logout</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['clearData']),
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.clearData()
          this.$router.push('/login')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.warning {
  color: #c62828;
}
#nav {
  padding: 10px;
}
a {
  color: #26a69a;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
  overflow-wrap: break-word;
}
</style>