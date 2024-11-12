<template>
  <v-btn
    @click="onDel()"
    :ripple="false"
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
import { useClassStore } from "@/stores/class"; // Import Pinia store

export default {
  props: ["item"],
  emits: ["Delclass"],
  data() {
    return {
      store: useClassStore(), // Access the store
    };
  },
  methods: {
    async onDel() {
      this.$openAlert("Q", this.$t("areYouSureToDelete")) // Open confirmation alert
        .then(async (res) => {
          this.$openLoading(); // Open loading indicator

          let result = await this.store.CRUDCLASSEXAM({
            id: this.item, // Pass the item ID
            ACTION: "DELETE", // Delete action
          });

          if (result.status == "200") {
            console.log("Emit");
            this.$openAlert("S", this.$t("deleteDataSuccess")) // Success alert
              .then(async (r) => {
                this.$emit("Delclass", "Deled"); // Emit event
                console.log("Delclass success");
                this.$closeLoading(); // Close loading
              });
          } else {
            this.$closeLoading(); // Close loading if error
            this.$openAlert("E", result.message); // Error alert
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
      // nuxtApp.$openAlert("Q", nuxtApp.$t("areYouSureToDelete"));
      // nuxtApp.$openLoading();
      // var result = await store.acDelclassExam(props.item);
      // if (result.status == "200") {
      //   nuxtApp.$openAlert("S", nuxtApp.$t("deleteDataSuccess"));
      //   emit("Delclass", "Deled");
      //   console.log("Delclass success");
      //   nuxtApp.$closeLoading();
      // } else {
      //   nuxtApp.$closeLoading();
      //   nuxtApp.$openAlert("E", result.message);
      // }
    },
    receiveDel() {
      // Logic for receiveDel can go here if needed
    },
  },
};
</script>


<style lang="scss" scoped></style>
