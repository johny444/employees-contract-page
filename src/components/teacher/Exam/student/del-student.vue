<template>
  <v-btn
    @click="onDel()"
    variant="text"
    density="compact"
    icon="fa-solid fa-plus"
    size="medium"
  >
    <v-icon style="color: red" icon="fa-regular fa-trash-can" />
    <v-tooltip activator="parent" location="start">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>

<script>
import { useStudentStore } from "@/stores/student";

export default {
  props: ["item"],
  emit: ["Delstudent"],
  data() {
    return {
      store: useStudentStore(), // Store initialization
    };
  },
  methods: {
    async onDel() {
      // Opening confirmation dialog
      this.$nuxt
        .$openAlert("Q", this.$nuxt.$t("areYouSureToDelete"))
        .then(async (res) => {
          this.loadingStore.openLoading();
          // Perform the delete operation
          var result = await this.store.CRUDStudent({
            id: this.item,
            ACTION: "DELETE",
          });
          console.log("result.status", result.status);
          if (result.status === "200") {
            // If delete is successful, show success alert and emit event
            this.$nuxt
              .$openAlert("S", this.$nuxt.$t("deleteDataSuccess"))
              .then(async (r) => {
                this.$emit("Delstudent", "Deled");
                console.log("Delclass success");
                this.loadingStore.closeLoading();
              });
          } else {
            // If delete fails, show error alert
            this.loadingStore.closeLoading();
            this.AlertStore.openAlert("E", result.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
    receiveDel() {
      // You can implement logic if needed after receiving a delete confirmation
    },
  },
};
</script>

