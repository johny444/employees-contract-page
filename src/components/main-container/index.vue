<template>
  <div class="main-container pa-2">
    <div class="header pa-4">
      <v-row>
        <v-col align="start">
          <h1>{{ $t("empcontractList") }}</h1>
        </v-col>
        <v-col align="end"> <LangSwitcher /> </v-col>
      </v-row>
    </div>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab :value="1" prepend-icon="fa-solid fa-file-contract">
        {{ $t("contractList") }}</v-tab
      >
      <v-tab :value="2" prepend-icon="fa-solid fa-users">
        {{ $t("plist") }}</v-tab
      >
    </v-tabs>
    <!-- <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="tab" mode="shift">
        <v-btn :value="1">
          <v-icon>fa-solid fa-file-contract</v-icon>
          <span>Contract</span>
        </v-btn>
        <v-btn :value="2">
          <v-icon>fa-solid fa-user-tie</v-icon>
          <span>Leader</span>
        </v-btn>

        <v-btn :value="3">
          <v-icon>fa-solid fa-users</v-icon>
          <span>All employees</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout> -->
    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <contract />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <position />
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
</style>
