<template>
  <div class="main-container pa-2">
    <div class="header pa-4">
      <v-row>
        <v-col align="start">
          <h1>{{ $t("empReportList") }}</h1>
        </v-col>
        <v-col align="end"> <LangSwitcher /> </v-col>
      </v-row>
    </div>

    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
      <div class="tab">
        <v-tab :value="1" prepend-icon="fa-solid fa-file-contract">
          {{ $t("contractList") }}</v-tab
        >
        <v-tab :value="2" prepend-icon="fa-solid fa-users">
          {{ $t("plist") }}</v-tab
        >
        <v-tab :value="3" prepend-icon="fa-solid fa-clock-rotate-left">
          {{ $t("dayoffHist") }}</v-tab
        >
      </div>
    </v-tabs>
    <v-divider :thickness="2" inset color="info"></v-divider>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <contract />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <position />
      </v-tabs-window-item>
      <v-tabs-window-item :value="3">
        <dayoff />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStore: useLoadingStore(),
      tab: 1,
    };
  },

  computed: {},
  methods: {},
  async mounted() {
    this.loadingStore.openLoading();
    this.loadingStore.closeLoading();
  },
};
</script>

<style scoped>
.main-container {
  background-color: rgb(242, 243, 247);
  max-height: 100vh;
  min-height: 100vh;
  overflow-x: hidden;
}
.tab {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
