<template>
<v-form
  class="text-center"
  @submit.prevent="login()">

  <v-text-field
    label="Username"
    v-model="identifier"/>

  <v-text-field
    label="Password"
    type="Password"
    v-model="password"/>

  <v-btn
    dark
    type="submit"
    :loading="processing">
    <v-icon left>mdi-login</v-icon>
    <span>Login</span>
  </v-btn>

  <div
    v-if="options.password_reset_url"
    class="mt-5">
    <a :href="options.password_reset_url">Password reset</a>
  </div>

  <v-snackbar
      color="#C00000"
      dark
      v-model="snack" >
      {{ snack_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snack = false" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

</v-form>
</template>

<script>
/*
This component exchanges credentials for a JWT and manages the storage of the JWT in cookies
*/

import axios from 'axios'
import VueCookie from 'vue-cookie'
import StoreMixin from '../mixins/store.js'

export default {
  name: 'LoginForm',
  props: {
    options: Object,
  },
  mixins: [StoreMixin],
  components: {

  },
  data(){
    return {
      identifier: '',
      password: '',
      snack: null,
      snack_text: '',
      processing: false,
    }
  },
  methods: {
    login(){
      // Send credentials and get JWT

      const url = this.options.login_url
      const body = { identifier: this.identifier, password: this.password }

      this.snack = null
      this.processing = true

      axios.post(url, body)

      .then( ({data}) => {

        const {jwt} = data

        if(!jwt) return

        const cookie_options = {
          secure: location.protocol === 'https:',
          samesite: 'Strict',
          expires: '1M',
        }

        if (this.options.jwt_storage === 'localStorage') localStorage.setItem('jwt', jwt)
        else VueCookie.set('jwt',jwt, cookie_options)

        this.get_user()

        // clear the inputs
        //this.identifier = ''
        //this.password = ''
      })
      .catch( (error) => {
        if(error.response) this.snack_text = error.response.data
        else this.snack_text = `Error while logging in`
        this.snack = true
        console.error(error)
       })
      .finally(() => {

        this.processing = false

      })

    },



  },
  computed: {

  }
}
</script>

<style scoped>



</style>
