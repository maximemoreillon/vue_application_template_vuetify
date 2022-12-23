<template>
  <v-app>

    <!-- Top bar -->
    <v-app-bar
      app
      clipped-left
      :color="app_bar_color"
      dark>

      <v-app-bar-nav-icon
        v-if="$slots.nav"
        @click="drawer = !drawer" />

      
      <img 
        class="header_logo"
        :class="{'rotating_logo': !options.header_logo}"
        :src="options.header_logo || 'https://cdn.maximemoreillon.com/logo/thick/logo.png'" >

      <v-toolbar-title>{{options.title || 'Untitled'}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <slot name="header" />

      <v-btn
        icon
        v-if="options.homepage_url"
        :href="options.homepage_url">
        <v-icon>mdi-apps</v-icon>
      </v-btn>

      <v-btn
        icon
        v-if="options.profile_url"
        :href="options.profile_url">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn
        icon
        v-if="user"
        @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

    <!-- Navigation drawer -->
    <v-navigation-drawer
      v-if="$slots.nav"
      v-model="drawer"
      clipped
      app>
      <slot name="nav" />
    </v-navigation-drawer>

    <v-main
      :class="main_background_color">


        <!-- Fluid to remove gutters -->
        <!-- v-if content not super clean here -->
        <!-- Maybe put a transition -->
        <v-container
          v-if="state === 'content'"
          fluid>

            <slot v-if="$slots.default"/>
            <template v-else>
              <!-- Route transitions -->
              <transition
                name="route-transition"
                mode="out-in"
                appear>

                <router-view
                  v-if="!route_loading"
                  class="actual_main"/>

                <!-- Haven't found a more vuetify way to do this -->
                <div
                  v-if="route_loading"
                  class="route_loader_wrapper">
                  <v-progress-circular
                    indeterminate
                    size="70"/>
                </div>

              </transition>
            </template>

        </v-container>

    </v-main>

    <!-- v-footer does not take app -->
    <v-footer
      :color="footer_background_color">
      <v-row dense justify="center">
        <v-col cols="auto">
          {{options.title || 'Untitled app'}} - {{options.author || 'Maxime Moreillon'}} - {{new Date().getFullYear()}}
        </v-col>
      </v-row>
    </v-footer>

    <!-- Authentication wall in overlay -->
    <AuthenticationWall
      :options="options"/>

  </v-app>
</template>

<script>
import VueCookie from 'vue-cookie'
import StoreMixin from './mixins/store.js'
import AuthenticationWall from './components/AuthenticationWall.vue'

export default {
  name: 'AppTemplate',
  props: {

    options: {
      default(){return {}}
    },
  },
  mixins: [StoreMixin],

  components: {
    AuthenticationWall
  },

  data(){
    return {
      drawer: this.options.drawer,
    }
  },

  // Watching user changes (i.e. user has logged in)
  // Used to set auth headers in Axios
  watch: {
    // User is in mixin
    user(){
      this.set_authorization_header()
      this.$emit('user',this.user)
    },


  },

  mounted(){
    this.set_options(this.options)

    if(this.options.login_url && this.options.identification_url) {
      this.get_user()
    }
    else this.set_state('content')

    this.set_router_loading_events()

  },

  methods: {
      set_authorization_header(){
      // check if axios is installed
      if(!this.axios) return

      const jwt = VueCookie.get("jwt") || localStorage.getItem('jwt')

      // setting or unsetting the header depends on jwt being in cookies
      if(jwt) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      }
      else {
        delete this.axios.defaults.headers.common['Authorization']
      }

    },

    set_router_loading_events(){
      // Check if router is installed
      if(!this.$router) return

      this.$router.beforeEach((to, from, next) => {
        this.set_route_loading(true)
        next()

      })

      this.$router.afterEach(() => {
        this.set_route_loading(false)
      })
    },
  },
  computed: {
    main_background_color(){
      const default_color = 'grey lighten-4'
      if(!this.options.colors) return default_color
      const {
        main,
        background,
      } = this.options.colors
      return main || background || default_color
    },
    footer_background_color(){
      const default_color = this.main_background_color
      if(!this.options.colors) return default_color
      const { footer } = this.options.colors
      return footer || default_color
    },
    app_bar_color(){
      const default_color = '#444444'
      if(!this.options.colors) return default_color
      const { app_bar } = this.options.colors
      return app_bar || default_color
    },
  }
}
</script>

<style >
.debug {
  outline: 1px solid red;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.route_loader_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.route-transition-enter-active, .route-transition-leave-active {
  transition: opacity 0.25s;
}
.route-transition-enter, .route-transition-leave-to {
  opacity: 0;
}

.header_logo {
    max-height: 2.5em;
    object-fit: scale-down;
    margin-right: 0.5em;
}

.rotating_logo {
  animation-name: rotating_logo;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotating_logo {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}
</style>
