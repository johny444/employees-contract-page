// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useHRStore = defineStore("HRStore", {
  state: () => ({
    employee: ref([]),
  }),
  getters: {},
  actions: {
    async GET_EMPLOYEELSIT(body: object) {
      const respone = await axios
        .post("http://localhost:8080/employees", body)
        .catch((err) => {
          console.log("ERRO form respone", err);
          return err;
        });
      // console.log("respone", respone);
      this.employee = respone.data;
      return respone;
    },
  },
});
