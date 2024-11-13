<template>
  <v-btn
    @click="onDel()"
    variant="text"
    density="compact"
    icon="fa-solid fa-plus"
    size="medium"
    :ripple="false"
  >
    <v-icon style="color: red" icon="fa-regular fa-trash-can" />
    <v-tooltip activator="parent" location="top">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>

<script>
import { useExamStore } from "@/stores/exam";

export default {
  props: ["item"],
  emit: ["Delclass"],
  data() {
    return {
      store: useExamStore(),
    };
  },
  methods: {
    async onDel() {
      try {
        this.$nuxt
          .$openAlert("Q", this.$nuxt.$t("areYouSureToDelete"))
          .then(async (res) => {
            this.loadingStore.openLoading();

            // Perform the delete operation
            const result = await this.store.CRUDEXAM({
              id: this.item,
              ACTION: "DELETE",
            });

            console.log("result.status", result.status);

            if (result.status == "200") {
              this.$nuxt
                .$openAlert("S", this.$nuxt.$t("deleteDataSuccess"))
                .then(() => {
                  this.$emit("DelExam", "Deled");
                  console.log("Delclass success");
                  this.loadingStore.closeLoading();
                });
            } else {
              this.loadingStore.closeLoading();
              this.AlertStore.openAlert("E", result.message);
            }
          })
          .catch((err) => {
            console.log("Error:", err);
            this.loadingStore.closeLoading();
          });
      } catch (error) {
        console.log("Caught Error:", error);
      }
    },
    receiveDel() {
      // Logic for receiving delete data if necessary
    },
  },
};
</script>


<style lang="scss" scoped></style>
