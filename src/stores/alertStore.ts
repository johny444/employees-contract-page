import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    open: false,
    type: "S", // "S:Success; E:Error, W:Warning; I:Info; Q:Question"
    message: "",
  }),
  getters: {},
  actions: {
    openDialog(type: string, message: string) {
      this.open = true;
      this.type = type;
      this.message = message;
    },

    closeDialog() {
      this.open = false;
    },
  },
});
