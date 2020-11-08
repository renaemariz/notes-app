<template>
  <div class="container">
    <h2 class="title"> Register </h2>
      <form @submit.prevent="validateForm">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix" aria-hidden="true">email</i>
            <input id="email" type="email" v-model="email" :class="{invalid: errors.email}" required>
            <label for="email">Email Address</label>
            <span v-if="errors.email" class="helper-text">{{errors.email}}</span>
          </div>

          <div class="input-field col s12">
            <i class="material-icons prefix" aria-hidden="true">vpn_key</i>
            <input id="password" type="password" v-model="password" :class="{invalid: errors.password}" required>
            <label for="password">Password</label>
            <span v-if="errors.password" class="helper-text">{{errors.password}}</span>
          </div>

          <div class="input-field col s12">
            <i class="material-icons prefix" aria-hidden="true">vpn_key</i>
            <input id="password-confirm" type="password" v-model="passwordConfirm" :class="{invalid: errors.password}" required>
            <label for="password-confirm">Confirm Password</label>
          </div>
        </div>
        <div class="row valign-wrapper">
          <div class="col s6 left-align">
            Already a member? <router-link to="/login">Login</router-link>
          </div>

          <div class="col s6 right-align">
            <button class="btn waves-effect waves-light" type="submit" name="action">Register</button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        email: '',
        password: ''
      },
      valid: true
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser']),

    validateForm () {
      this.valid = true
      const validatePassword = (password, passwordConfirm) => {
        if (password.length < 6) {
          return { valid: false, error: 'Password should be atleast 6 characters' }
        }
        if (password !== passwordConfirm) {
          return { valid: false, error: 'Password does not match' }
        }
        return { valid: true, error: null }
      }

      const validateEmail = email => {
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3,6}$/)) {
          return { valid: false, error: 'Please enter a valid email' }
        }
        return { valid: true, error: null }
      }

      const validPassword = validatePassword(this.password, this.passwordConfirm)
      this.errors.password = validPassword.error
      if (this.valid) {
        this.valid = validPassword.valid
      }

      const validEmail = validateEmail(this.email)
      this.errors.email = validEmail.error
      if (this.valid) {
        this.valid = validEmail.valid
      }

      if (this.valid) {
        this.register()
      }
    },
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
              .then((user) => {
                this.setCurrentUser(user.user.email)
                this.$router.push('/')
              })
              .catch((error) => {
                console.log(err)
              })
        })
        .catch((error) => {
            this.errors.email = error
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
