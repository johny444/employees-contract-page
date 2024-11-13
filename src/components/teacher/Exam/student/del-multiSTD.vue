<template>
  <v-btn
    @click="onDel()"
    variant="text"
    density="compact"
    icon="fa-solid fa-plus"
    size="medium"
  >
    <v-icon style="color: red" icon="fa-regular fa-trash-can" />
    <v-tooltip activator="parent" location="end">
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
      store: useStudentStore(),
    };
  },
  methods: {
    onDel() {
      console.log("Del", this.item);
      this.$nuxt
        .$openAlert("Q", this.$nuxt.$t("areYouSureToDelete"))
        .then(async (res) => {
          this.loadingStore.openLoading();

          let rs = "";
          for (let index = 0; index < this.item.length; index++) {
            console.log("this.item[index]:", this.item[index]);
            rs = await this.store.CRUDStudent({
              id: this.item[index],
              ACTION: "DELETE",
            });
          }
          console.log("rs", rs);
          if (rs.status === "200") {
            this.$nuxt
              .$openAlert("S", this.$nuxt.$t("deleteDataSuccess"))
              .then(async (r) => {
                console.log("Emit");
                this.$emit("Delstudent", "Deled");
                console.log("Delclass success");
                this.loadingStore.closeLoading();
              });
          } else {
            this.loadingStore.closeLoading();
            this.AlertStore.openAlert("E", rs.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
    receiveDel() {
      // handle the deletion response or other logic here if needed
    },
  },
};
</script>
