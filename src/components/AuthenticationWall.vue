<template>
<v-overlay
  color="white"
  class="wall"
  light
  :dark="false"
  opacity="1"
  z-index="1000"
  :value="state !== 'content'">

  <v-container 
    fluid
    fill-height>
    <v-row>
      <v-col
        cols="12"
        class="logo_wrapper">
        <AnimatedLogo class="logo" v-if="true"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="centered">

        <transition name="fade" mode="out-in" appear>
          <LoginForm
            key="loginForm"
            v-if="state === 'login'"
            :title="title"/>

          <div 
            class="greetings"
            v-if="state === 'greetings'" >
            Welcome {{user.properties.display_name}}
          </div>

          <v-progress-circular
            v-if="['loading','initial'].includes(state)"
            indeterminate/>

        </transition>
      </v-col>
      
    </v-row>
    
  </v-container>

  


      
</v-overlay>
 
</template>

<script>
import StoreMixin from '../mixins/store.js'

import LoginForm from './LoginForm.vue'
import AnimatedLogo from './AnimatedLogo.vue'

export default {
  name: 'AuthenticationWall',
  props: {
    title: String,
  },
  mixins: [
    StoreMixin,
  ],
  components: {
    LoginForm,
    AnimatedLogo,
  },
  computed: {

  }
}
</script>

<style scoped>
.wall {
  display: flex;
  align-items: flex-start;
}
.logo_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 5vmin;
  margin-bottom: 2vmin;
}

.centered {
  display: flex;
  justify-content: center;
}

.greetings {
  font-size: 150%;
}

.logo {
 width: 30vmin;
  height: 30vmin;

}

.title {
  font-size: 150%;
  margin-bottom: 2.5vh;
}



</style>
