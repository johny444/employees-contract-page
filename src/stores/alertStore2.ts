import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore2 = defineStore("loading2", {
  state: () => ({
    dialog: false,
    resolve: (val: boolean) => {},
    reject: (val: boolean) => {},
    message: "",
    title: "",
    type: "I", // "S:Success; E:Error, W:Warning; I:Info; Q:Question"
    options: {
      color: "primary",
      width: 290,
      zIndex: 200,
    },
  }),
  actions: {
    openAlert(type: string, message: string) {
      this.dialog = true;
      this.type = type;
      this.message = message;
      return new Promise<boolean>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    alertAgree() {
      this.resolve(true);
      this.dialog = false;
    },
    alertCancel() {
      if (this.type == "Q") {
        this.reject(true);
      }
      this.dialog = false;
    },
  },
});
