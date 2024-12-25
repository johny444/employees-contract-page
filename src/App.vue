<template>
  <loading />
  <alertDialog />
  <alert />
  <v-app>
    <v-main>
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
      return this.$route.meta.layout || DefaultLayout;
    },
  },
};
</script>


<style>
/* You can add any styles specific to App.vue here */
</style>
