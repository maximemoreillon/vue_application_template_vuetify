<template>
  <v-app>

    


    <transition name="fade" mode="out-in" appear>

      <!-- Wrapping stuff in a div might not be a good idea -->
      <div v-if="state==='content'">

        <!-- Top bar -->
        <v-app-bar
          app
          clipped-left
          color="primary"
          dark>

          <v-app-bar-nav-icon @click="drawer = !drawer" />

          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 rotating_logo"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="40" />
          
          <v-toolbar-title
            v-if="title">
            {{title}}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn  
            icon
            v-if="homepage_url"
            :href="homepage_url">
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
          v-model="drawer"
          clipped
          app>
          <slot name="nav" />
        </v-navigation-drawer>



        <v-main>
          <v-container fluid>
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
                <div v-else class="route_loader_wrapper">
                  <v-progress-circular 
                    indeterminate
                    size="70"/>
                </div>
                

                

              </transition>
            </template>
          </v-container>
        </v-main>

        
        

        

        <!--
        <v-footer padless color="transparent">
          <v-col
            class="text-center"
            cols="12" >
            {{title}} - {{new Date().getFullYear()}} - Maxime Moreillon
          </v-col>
          
        </v-footer>
        -->
      </div>



      <!-- If the app is protected behind a login wall -->
      <v-main v-else>
        <v-container fluid>
          <AuthenticationWall :title="title"/>
        </v-container>
      </v-main>
    </transition>

    

    


    

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
  },
  mixins: [StoreMixin],

  components: {
    AuthenticationWall
  },

  data: () => ({
    drawer: null,
    homepage_url: process.env.VUE_APP_HOMEPAGE_URL,
    authentication_api_url: process.env.VUE_APP_AUTHENTICATION_API_URL
  }),

  // Watching user changes (i.e. user has logged in)
  // Used to set auth headers in Axios
  watch: {
    // User is in mixin
    user(){
      this.set_authorization_header()
    }
  },

  mounted(){
    if(this.authenticate) {
      if(this.authentication_api_url) {
        this.get_user()
      }
      else {
        console.error('Authenticate set to true but VUE_APP_AUTHENTICATION_API_URL not set')
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
      if(!this.axios) return

      const jwt = VueCookies.get("test_jwt")

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

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.route_loader_wrapper {
  margin-top: 20vh;
  display: flex;
  justify-content: center;
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