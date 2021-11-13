<template>
  <AppTemplate
    :options="options"
    @user="get_user($event)">

    <template v-slot:nav>
      <v-list
        dense
        nav >
        <v-list-item
          v-for="(item, index) in nav"
          :key="`nav_item_${index}`"
          :to="item.to"
          exact>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

  </AppTemplate>
</template>

<script>
import AppTemplate from '@/AppTemplate.vue'
export default {
  name: 'App',

  components: {
    AppTemplate
  },

  data: () => ({
    options: {
      // Names
      title: "Vuetify template",
      //author: 'Roger Banana', // name written in the footer

      // Colors
      colors: {
        main: 'red',
        footer: 'blue',
        //app_bar: 'yellow'
      },
      //main_class: 'blue lighten-4',
      //app_bar_color: '#222',
      //footer_color: 'pink lighten-5',

      // Logos
      //header_logo: require('@/assets/skt_logo_white.svg'),
      //authentication_logo: require('@/assets/skt_logo_black.svg'),

      // Authentication
      authenticate: true, // enforce authentication
      login_url: process.env.VUE_APP_LOGIN_URL,
      identification_url: process.env.VUE_APP_IDENTIFICATION_URL,
      //skip_greetings: true, // do not show greetings

    },
    nav: [
      {title: 'Home', to: {name: 'Home'}, icon: 'mdi-home'},
      {title: 'About', to: {name: 'About'}, icon: 'mdi-information-outline'},
      {title: 'Misc', to: {name: 'Misc'}, icon: 'mdi-menu'},
    ]
  }),

  methods: {
    get_user(user){
      console.log(user)
    }
  }
};
</script>
