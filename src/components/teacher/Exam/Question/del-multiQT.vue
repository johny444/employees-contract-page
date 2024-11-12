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
    <v-tooltip activator="parent" location="end">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>
<script>
import { useQuestionStore } from "@/stores/question";

export default {
  props: ["item"],
  emits: ["DelQT"],
  data() {
    return {
      // You can define any reactive properties here if needed
    };
  },
  created() {
    // Store can be initialized here
    this.store = useQuestionStore();
    // Nuxt app or other initializations
  },
  methods: {
    onDel() {
      console.log("Del", this.item);
      this.$nuxt
        .$openAlert("Q", this.$t("areYouSureToDelete"))
        .then(async (res) => {
          this.$nuxt.$openLoading();
          let rs = "";
          for (let index = 0; index < this.item.length; index++) {
            rs = await this.store.CRUDQUESTION({
              id: this.item[index],
              ACTION: "DELETE",
            });
          }
          console.log("rs", rs);
          if (rs.status === "200") {
            this.$nuxt
              .$openAlert("S", this.$t("deleteDataSuccess"))
              .then(async (r) => {
                console.log("Emit");
                this.$emit("DelQT", "Deleted");
                console.log("Del class success");
                this.$nuxt.$closeLoading();
              });
          } else {
            this.$nuxt.$closeLoading();
            this.$nuxt.$openAlert("E", rs.message); // Make sure to use the correct response message
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
    receiveDel() {
      // This method is defined but not used in your provided code
    },
  },
};
</script>


<style lang="scss" scoped></style>
