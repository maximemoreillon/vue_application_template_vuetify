import Vue from "vue"
import VueCookies from 'vue-cookies'
import axios from 'axios'

const state = Vue.observable({
  // This is dirty
  template_options: {},
  state: 'initial',
  user: null,
  route_loading: false,
  nav_open: false,
})



const mutations = {
  // This is dirty
  set_options(options) {
    state.template_options = options
  },
  set_state(new_state) {
    state.state = new_state
  },
  set_user(user) {
    state.user = user
  },
  get_user(){

    this.set_state('loading')

    const jwt = VueCookies.get("jwt")
    if(!jwt) {
      this.set_user(undefined)
      this.set_state('login')
      return
    }

    const url = state.template_options.identification_url
    const headers = { Authorization: `Bearer ${jwt}` }

    axios.get(url, {headers})
    .then( ({data}) => {
      this.set_user(data)

      // This will show even if the user is logged in already at the time of opening the app
      if(state.template_options.skip_greetings) {
        this.set_state('content')
      }
      else {
        this.set_state('greetings')
        setTimeout(() => {
          this.set_state('content')
        },2000)
      }



    })
    .catch( (error) => {
      // there was a problem authenticating the user against the auth API
      console.error(error)
      this.set_user(undefined)
      this.set_state('login')
      VueCookies.remove('jwt')
      // How to deal with Axios headers?
    })
    .finally( () => { })
  },
  logout(){
    VueCookies.remove('jwt')
    this.get_user()
  },
  set_user_loading(loading){
    state.user_loading = loading
  },
  set_route_loading(loading){
    state.route_loading = loading
  },
  set_nav_open(nav_state){
    state.nav_open = nav_state
  },
  open_nav(){
    state.nav_open = true
  },
  close_nav(){
    state.nav_open = false
  },
  toggle_nav(){
    state.nav_open = !state.nav_open
  }
}

export default {
  state,
  mutations
}
