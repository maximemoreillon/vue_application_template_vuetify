<template>
  <v-app>

    <!-- Top bar -->
    <v-app-bar
      app
      clipped-left
      color="#444444"
      dark>

      <v-app-bar-nav-icon
        v-if="$slots.nav"
        @click="drawer = !drawer" />

      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2 rotating_logo"
        contain
        src="https://cdn.maximemoreillon.com/logo/thick/logo.png"
        transition="scale-transition"
        width="40" />

      <v-toolbar-title
        v-if="title">
        {{title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- TODO put slot here -->

      <v-btn
        icon
        v-if="options.homepage_url"
        :href="options.homepage_url">
        <v-icon>mdi-apps</v-icon>
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
      :class="options.main_class">


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
                <div v-if="route_loading" class="route_loader_wrapper">
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
      padless
      color="transparent"
      class="text-center" >
      <!-- wrapping in a row creates overflow -->
      <!-- cols 12 for full width -->
      <!-- Cannot get text-center to work unless wrapped in v-col -->
      <v-col
        class="text-center"
        cols="12" >
        <span v-if="title || options.title">{{title || options.title}} -</span>
         {{options.author || 'Maxime Moreillon'}} - {{new Date().getFullYear()}}
      </v-col>
    </v-footer>

    <!-- Authentication wall in overlay -->
    <AuthenticationWall
      :title="title"
      :options="options"/>

  </v-app>
</template>

<script>
import VueCookies from 'vue-cookies'
import StoreMixin from './mixins/store.js'
import AuthenticationWall from './components/AuthenticationWall.vue'

export default {
  name: 'AppTemplate',
  props: {

    title: String,
    authenticate: Boolean,
    options: {
      default(){return {}}
    },
  },
  mixins: [StoreMixin],

  components: {
    AuthenticationWall
  },

  data: () => ({
    drawer: null,
  }),

  // Watching user changes (i.e. user has logged in)
  // Used to set auth headers in Axios
  watch: {
    // User is in mixin
    user(){
      this.set_authorization_header()
    },


  },

  mounted(){
    this.set_options(this.options)
    if(this.options.authenticate) {
      if(this.options.login_url && this.options.identification_url) {
        this.get_user()
      }
      else {
        console.error('Missing login_url or identification_url')
        this.set_state('content')
      }
    }
    else {
      this.set_state('content')
    }

    this.set_router_loading_events()
  },

  methods: {
      set_authorization_header(){
      // check if axios is installed
      if(!this.axios) {
        console.error(`Axios not found, skipping auth header`)
        return
      }

      const jwt = VueCookies.get("jwt")

      // wither set or unset the header depending on of jwt being in cookies
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
  }
};
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
