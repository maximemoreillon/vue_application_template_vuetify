import Vue from "vue"
import VueCookie from "vue-cookie"
import axios from "axios"
// import { UserManager } from "oidc-client-ts"
import OidcAuth from "@moreillon/oidc-auth"
const state = Vue.observable({
  // This is dirty
  template_options: {},
  state: "initial",
  user: null,
  route_loading: false,
  nav_open: false,
  oidc_auth: null,
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
  get_user() {
    const {
      state: previousState,
      template_options: {
        identification_url,
        skip_greetings,
        greeting_Duration = 1500,
      },
    } = state

    this.set_state("loading")

    const jwt = VueCookie.get("jwt") || localStorage.getItem("jwt")

    if (!jwt) {
      this.set_user(undefined)
      this.set_state("login")
      return
    }

    const headers = { Authorization: `Bearer ${jwt}` }

    axios
      .get(identification_url, { headers })
      .then(({ data }) => {
        this.set_user(data)

        // This will show even if the user is logged in already at the time of opening the app
        if (previousState === "login" && !skip_greetings) {
          this.set_state("greetings")
          setTimeout(() => {
            this.set_state("content")
          }, greeting_Duration)
        } else this.set_state("content")
      })
      .catch((error) => {
        // there was a problem authenticating the user against the auth API
        console.error(error)

        if (error.response) {
          const { status } = error.response
          if (status === 403) {
            VueCookie.delete("jwt")
            localStorage.removeItem("jwt")
          }
        }

        this.set_user(undefined)
        this.set_state("login")

        // How to deal with Axios headers?
        // Should be done by user
      })
      .finally(() => {})
  },
  get_user_oidc() {
    this.set_state("loading")

    const {
      // state: previousState,
      template_options: { oidc: oidcOptions },
    } = state

    if (!oidcOptions) throw "OIDC not configured"

    this.set_oidc_auth(new OidcAuth(oidcOptions))

    state.oidc_auth.init().then((user) => {
      if (!user) return
      this.set_user(user)
      this.set_state("content")
    })

    state.oidc_auth.userManager.events.addUserLoaded((user) => {
      this.set_user(user)
    })
  },
  logout() {
    if (state.oidc_auth) {
      state.oidc_auth.userManager.signoutRedirect()
    } else {
      VueCookie.delete("jwt")
      localStorage.removeItem("jwt")
      this.get_user()
    }
  },
  set_user_loading(loading) {
    state.user_loading = loading
  },
  set_route_loading(loading) {
    state.route_loading = loading
  },
  // Nav
  set_nav_open(nav_state) {
    state.nav_open = nav_state
  },
  open_nav() {
    state.nav_open = true
  },
  close_nav() {
    state.nav_open = false
  },
  toggle_nav() {
    state.nav_open = !state.nav_open
  },
  // OIDC
  set_oidc_auth(oidc_auth) {
    state.oidc_auth = oidc_auth
  },
}

export default {
  state,
  mutations,
}
