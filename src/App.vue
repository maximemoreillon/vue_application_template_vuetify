<template>
  <AppTemplate 
    title="Example"
    :authenticate="true">
    
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
    nav: [
      {title: 'Home', to: {name: 'Home'}, icon: 'mdi-home'},
      {title: 'About', to: {name: 'About'}, icon: 'mdi-information-outline'},
      {title: 'Misc', to: {name: 'Misc'}, icon: 'mdi-menu'},
    ]
  }),
};
</script>
