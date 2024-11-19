<template>
  <v-breadcrumbs class="pa-0" :items="dataItem">
    <template v-slot:divider>
      <v-icon
        style="font-size: 20px"
        icon="fa-regular fa-hand-point-right"
      ></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: ["dataItem"],
};
</script>

<style lang="scss" scoped>
</style>