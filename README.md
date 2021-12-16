# Vuetify application template

## Usage
```vue
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
import AppTemplate from '@moreillon/vue_application_template_vuetify'
export default {
  name: 'App',

  components: {
    AppTemplate
  },

  data: () => ({
    options: {
      title: "Your application title goes here",
      authenticate: true,
      login_url: `${process.env.VUE_APP_AUTHENTICATION_API_URL}/login`,
      identification_url: `${process.env.VUE_APP_AUTHENTICATION_API_URL}/v2/whoami`,
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
```
## Options

```javascript
options: {
  // Names
  title: "Vuetify template example",
  author: 'Example Author', // name written in the footer

  skip_greetings: true, // do not show greetings

  // Colors
  colors: {
    main: 'red',
    footer: 'blue',
    app_bar: 'yellow',
  },

  // Logos
  header_logo: require('@/assets/skt_logo_white.svg'),
  authentication_logo: require('@/assets/skt_logo_black.svg'),

  // Authentication
  // Authentication is enforced if both those the following options are set
  login_url: process.env.VUE_APP_LOGIN_URL,
  identification_url: process.env.VUE_APP_IDENTIFICATION_URL,



},
```
