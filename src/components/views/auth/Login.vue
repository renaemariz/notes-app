<template>
    <div class="container">
       <h2 class="title"> Notes App </h2>
          <p class="warning" v-if="errors.message">{{errors.message}}</p>
          <form @submit.prevent="login">
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix" aria-hidden="true">email</i>
                <input id="email" type="email" v-model="email" :class="{invalid: errors.email}" required>
                <label for="email">Email Address</label>
              </div>

              <div class="input-field col s12">
                <i class="material-icons prefix" aria-hidden="true">vpn_key</i>
                <input id="password" type="password" v-model="password" :class="{invalid: errors.password}" required>
                <label for="password">Password</label>
              </div>
            </div>

            <div class="row valign-wrapper">
              <div class="col s6 left-align">
                Not yet a member? <router-link to="/register">Register</router-link>
              </div>

              <div class="col s6 right-align">
                <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
              </div>
            </div>
          </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errors: {
        message: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.setCurrentUser(user.user.email)
          this.$router.push('/')
        })
        .catch((error) => {
          this.errors.message = error.message        
        })
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
  color: #42b983;
}
</style>