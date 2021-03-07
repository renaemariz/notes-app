<template>
  <div class="container">
    <div class="row">
      <div class="col m8 s12 offset-m2">
        <h2 class="title"> Notes App </h2>
        <p class="warning" v-if="errors.message">{{errors.message}}</p>
      </div>
    </div>
    <form @submit.prevent="login">
      <div class="row">
        <div class="input-field col m8 s12 offset-m2">
          <i class="material-icons prefix" aria-hidden="true">email</i>
          <input id="email" type="email" v-model="email" :class="{invalid: errors.email}" required>
          <label for="email">Email Address</label>
        </div>
        <div class="input-field col m8 s12 offset-m2">
          <i class="material-icons prefix" aria-hidden="true">vpn_key</i>
          <input id="password" type="password" v-model="password" :class="{invalid: errors.password}" required>
          <label for="password">Password</label>
        </div>
      </div>

      <div class="row valign-wrapper">
        <div class="col m4 s12 left-align offset-m2">
          Not yet a member? <router-link to="/register">Register</router-link>
        </div>

        <div class="col m2 s12 right-align offset-m2">
          <SubmitBtn :submitBtn="submitBtnValues"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapMutations } from 'vuex'
import SubmitBtn from '@/components/common/SubmitBtn'

export default {
  name: 'Login',
  components: {
    SubmitBtn
  },  
  data () {
    return {
      email: '',
      password: '',
      errors: {
        message: ''
      },
      submitBtnValues: {
        value: 'Login',
        loading: false
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    login () {
      this.submitBtnValues.loading = true
      // login user
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.setCurrentUser(user.user.email)
          this.$router.push('/')
        })
        .catch((error) => {
          this.errors.message = error.message
          this.submitBtnValues.loading = false
        })
    },
  }
}
</script>