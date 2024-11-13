<template>
  <v-dialog
    v-model="AlertStore.open"
    transition="dialog-top-transition"
    width="auto"
  >
    <!-- <v-card>
      <v-icon> fa-solid fa-check-double </v-icon>
      <v-card-text class="bg-teal-darken-2">
        <h1>{{ $t("insertDataSuccess") }}</h1>
      </v-card-text>
    </v-card> -->
    <!-- --------------- -->
    <!-- <v-alert title="Alert title" type="success">{{
      $t("insertDataSuccess")
    }}</v-alert> -->
    <template v-if="AlertStore.type === 'E'">
      <v-alert color="red" theme="dark" border>
        <h1>{{ AlertStore.message }}!</h1>
      </v-alert>
    </template>
    <template v-else-if="AlertStore.type === 'U'">
      <v-alert color="deep-purple-darken-2" theme="dark" type="success" border>
        <h1>{{ AlertStore.message }}!</h1>
      </v-alert>
    </template>
    <template v-else-if="AlertStore.type === 'S'">
      <!-- <v-alert color="deep-purple-darken-2" theme="dark" type="success" border>
        <h1>{{ $t("success") }}!</h1>
        <p>{{ AlertStore.message }}!</p>
      </v-alert> -->

      <v-card class="mx-auto" width="400" color="success">
        <v-card-item class="pa-0 ma-2">
          <v-card-title class="d-flex">
            <v-icon>fa-regular fa-circle-check</v-icon>
            <h2 class="font-weight-black ml-2">{{ $t("success") }}</h2>
          </v-card-title>
        </v-card-item>
        <v-card-text
          class="bg-surface-light text-center"
          style="font-size: 1.5rem"
        >
          {{ AlertStore.message }}!
        </v-card-text>
      </v-card>
    </template>
    <template v-else-if="AlertStore.type === 'W'">
      <!-- <v-alert color="deep-purple-darken-2" theme="dark" type="success" border>
        <h1>{{ AlertStore.message }}!</h1>
      </v-alert> -->
      <v-card class="mx-auto" width="400" color="warning" prepend-icon="">
        <v-card-item class="pa-0 ma-2">
          <v-card-title class="d-flex">
            <v-icon>fas fa-triangle-exclamation</v-icon>
            <h2 class="font-weight-black ml-2">{{ $t("Warning") }}</h2>
          </v-card-title>
        </v-card-item>
        <v-card-text
          class="bg-surface-light text-center"
          style="font-size: 1.5rem"
        >
          {{ AlertStore.message }}!
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { useAlertStore } from "@/stores/alertStore";
export default {
  data: () => ({
    snackbar: true,
    text: "My timeout is set to 2000.",
    timeout: 2000,
    AlertStore: useAlertStore(),
  }),
};
</script>

<style scoped>
p {
  font-size: 1.5rem;
}
</style>
