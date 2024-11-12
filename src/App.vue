<template>
  <loading />
  <v-app>
    <v-main>
      <!-- Dynamically render the layout specified in the route's meta -->
      <component :is="currentLayout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue"; // Fallback layout

export default {
  data() {
    return {
      route: useRoute(), // Store the current route in data
    };
  },
  computed: {
    currentLayout() {
      // Computed property to get the layout from route meta or fallback to DefaultLayout
      return this.$route.meta.layout || DefaultLayout;
    },
  },
};
</script>


<style>
/* You can add any styles specific to App.vue here */
</style>
