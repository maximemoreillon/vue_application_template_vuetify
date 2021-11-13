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
        <transition name="fade" mode="out-in" appear>
          <v-img
            v-if="options.authentication_logo"
            max-height="30vmin"
            max-width="30vmin"
            :src="options.authentication_logo"/>
          <AnimatedLogo
            v-else
            class="logo"/>
        </transition>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto text-h6">
        <span class="application_title">{{options.title}}</span>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        cols="auto">

        <transition name="fade" mode="out-in" appear>
          <LoginForm
            :options="options"
            key="loginForm"
            v-if="state === 'login'"/>

          <div
            class="text-h4"
            v-if="state === 'greetings'" >
            Welcome {{
              user.display_name ||
              user.username ||
              user.properties.display_name ||
              user.properties.username
            }}
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
    options: {
      default(){return {}}
    },
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



.logo {
  width: 30vmin;
  height: 30vmin;

}

.title {
  font-size: 150%;
  margin-bottom: 2.5vh;
}

.debug {
  outline: 1px solid red;
}

.application_title{
  animation-name: title_appear;
  animation-duration: 1s;
  animation-delay: 0.25s;
  animation-fill-mode: both;
}

@keyframes title_appear {
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
