<template>
  <div class="container">
    <h2 class="title"> Register </h2>
    <form @submit.prevent="validateForm">
      <div class="row">
        <div class="input-field col m8 s12 offset-m2">
          <i class="material-icons prefix" aria-hidden="true">email</i>
          <input id="email" type="text" v-model="email" :class="{invalid: errors.email}" required>
          <label for="email">Email Address</label>
          <span v-if="errors.email" class="helper-text">{{errors.email}}</span>
        </div>

        <div class="input-field col m8 s12 offset-m2">
          <i class="material-icons prefix" aria-hidden="true">vpn_key</i>
          <input id="password" type="password" v-model="password" :class="{invalid: errors.password}" required>
          <label for="password">Password</label>
          <span v-if="errors.password" class="helper-text">{{errors.password}}</span>
        </div>

        <div class="input-field col m8 s12 offset-m2">
          <i class="material-icons prefix" aria-hidden="true">vpn_key</i>
          <input id="password-confirm" type="password" v-model="passwordConfirm" :class="{invalid: errors.password}" required>
          <label for="password-confirm">Confirm Password</label>
        </div>

      </div>

      <div class="row valign-wrapper">
        <div class="col m3 s12 left-align offset-m2">
          Already a member? <router-link to="/login">Login</router-link>
        </div>

        <div class="col m3 s12 right-align offset-m2">
          <SubmitBtn :submitBtn="submitBtnValues"/>
        </div>
        
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import firebase from 'firebase/app'
import SubmitBtn from '@/components/common/SubmitBtn'

export default {
  name: 'Register',
  components: {
    SubmitBtn
  },
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        email: '',
        password: ''
      },
      valid: true,
      submitBtnValues: {
        value: 'Register',
        loading: false
      }    
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser']),

    validateForm () {
      this.submitBtnValues.loading = true

      this.valid = true
      const validateEmail = email => {
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3,6}$/)) {
          return { valid: false, error: 'Please enter a valid email' }
        }
        return { valid: true, error: null }
      }

      const validatePassword = (password, passwordConfirm) => {
        if (password.length < 6) {
          return { valid: false, error: 'Password should be atleast 6 characters' }
        }
        if (password !== passwordConfirm) {
          return { valid: false, error: 'Password does not match' }
        }
        return { valid: true, error: null }
      }

      const isEmailValid = validateEmail(this.email)
      const isPasswordValid = validatePassword(this.password, this.passwordConfirm)

      this.errors.email = isEmailValid.error
      this.errors.password = isPasswordValid.error

      if (!isEmailValid.valid || !isPasswordValid.valid) {
        this.valid = false
        this.submitBtnValues.loading = false
      } else {
        this.register()
      }
    },
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.login ()
        })
        .catch((error) => {
            this.errors.email = error
            this.submitBtnValues.loading = false
        })
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.push("/")
          this.setCurrentUser(user.user.email)
        })
        .catch((error) => {
          console.log(err)
          this.submitBtnValues.loading = false
        })
    }
  }
}
</script>