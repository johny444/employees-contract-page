<template>
  <div>
    <v-dialog
      v-model="AlertStore.dialog"
      transition="dialog-top-transition"
      width="auto"
      persistent
    >
      <v-card class="rounded-lg">
        <v-toolbar
          v-if="AlertStore.type == 'Q'"
          density="compact"
          color="secondary"
          ><v-icon
            size="x-large"
            color="white"
            icon="fas fa-question"
            class="mx-2"
          ></v-icon>
          <h2>{{ $t("Question") }}</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar
          v-else-if="AlertStore.type == 'S'"
          density="compact"
          color="success"
          ><v-icon
            size="x-large"
            color="white"
            icon="fa-regular fa-circle-check"
            class="mx-2"
          ></v-icon>
          <h2>{{ $t("success") }}</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar
          v-else-if="AlertStore.type == 'E'"
          density="compact"
          color="error"
          ><v-icon
            size="x-large"
            color="white"
            icon="fas fa-xmark"
            class="mx-2"
          ></v-icon>
          <h2>{{ $t("Error") }}</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar
          v-else-if="AlertStore.type == 'W'"
          density="compact"
          color="warning"
          ><v-icon
            size="x-large"
            icon="fas fa-triangle-exclamation"
            class="mx-2"
          ></v-icon>
          <h2>{{ $t("Warning") }}</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar
          v-else-if="AlertStore.type == 'I'"
          density="compact"
          color="info"
          ><v-icon
            size="x-large"
            icon="fas fa-circle-info"
            class="mx-2"
          ></v-icon>
          <h2>{{ $t("Info") }}</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar
          v-else
          density="compact"
          color="secondary"
          title="Alert"
        ></v-toolbar>
        <v-card-text
          style="
            min-width: 500px;
            max-width: 600px;
            min-height: 100px;
            max-height: 250px;
          "
        >
          <div class="py-4 text-center">
            <h2>{{ AlertStore.message }}</h2>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end py-0">
          <v-btn
            class="rounded-lg"
            width="100px"
            variant="tonal"
            color="primary"
            @click="open"
            >{{ $t("oK") }}</v-btn
          >
          <v-btn
            v-if="AlertStore.type == 'Q'"
            class="rounded-lg"
            width="100px"
            variant="tonal"
            color="error"
            @click="cancel"
            >{{ $t("cancel") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script >
export default {
  data() {
    return {
      AlertStore: useAlertStore2(),
    };
  },
  methods: {
    cancel() {
      this.AlertStore.alertCancel();
    },
    open() {
      this.AlertStore.alertAgree();
    },
  },
};
</script>

