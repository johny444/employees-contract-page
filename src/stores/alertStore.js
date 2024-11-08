// @ts-ignore
import { defineStore } from "pinia";
import { ref } from "vue";
export const useAlertStore = defineStore("alert", {
  state: () => ({
    openA: false,
    type: "S", // "S:Success; E:Error, W:Warning; I:Info; Q:Question"
    msg: "",
  }),
  getters: {
    getmsg: (state) => state.msg,
  },
  actions: {
    openDialog: (type, msg) => {},
    closeDialog: () => {},
  },
});
