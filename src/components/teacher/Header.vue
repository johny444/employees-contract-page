<template>
  <div>
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-title>{{ $t("examinationSystem") }}</v-app-bar-title>
      <LangSwitcher />
      <!-- <v-btn
        variant="text"
        density="compact"
        icon="fa-solid fa-right-from-bracket"
        size="medium"
        @click="
          () => {
            navigateTo(`/`);
          }
        "
      >
        <v-icon icon="fa-solid fa-right-from-bracket"></v-icon>
        <v-tooltip activator="parent" location="start">{{
          $t("logOut")
        }}</v-tooltip>
      </v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style></style>
