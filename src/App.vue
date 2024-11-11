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

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue"; // Fallback layout

// Get the current route to determine the layout component
const route = useRoute();
const currentLayout = computed(() => route.meta.layout || DefaultLayout);
</script>

<style>
/* You can add any styles specific to App.vue here */
</style>
