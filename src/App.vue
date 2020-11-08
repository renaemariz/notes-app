<template>
  <div id="app">
    <div id="nav" v-if="currentUser" class="right-align">
      <router-link to="/login" event="" @click.native.prevent="logout">Logout</router-link>
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
}
.warning {
  color: #c62828;
}
#nav {
  padding: 10px;
}
a {
  color: #42b983;
}
</style>
