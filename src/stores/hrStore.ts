// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useHRStore = defineStore("HRStore", {
  state: () => ({
    employee: ref([]),
  }),
  getters: {},
  actions: {
    // async GET_EMPLOYEELSIT(body: object) {
    //   // console.log("API", import.meta.env.VITE_API);
    //   let API = import.meta.env.VITE_API;
    //   const respone = await axios
    //     .post(`${API}/employees`, body)
    //     .catch((err) => {
    //       console.log("ERRO form respone", err);
    //       return err;
    //     });
    //   // console.log("respone", respone);
    //   this.employee = respone.data;
    //   return respone;
    // },
    // async GET_EMPLOYEEPOSITION(type: string) {
    //   // console.log("API", import.meta.env.VITE_API);
    //   console.log("type", type);
    //   let API = import.meta.env.VITE_API;
    //   const respone = await axios
    //     .post(`${API}/employees-position`, type)
    //     .catch((err) => {
    //       console.log("ERRO form respone", err);
    //       return err;
    //     });
    //   // console.log("respone", respone);
    //   this.employee = respone.data;
    //   return respone;
    // },
    // async GET_DayoffHist(body: object) {
    //   // console.log("API", import.meta.env.VITE_API);
    //   console.log("type", body);
    //   let API = import.meta.env.VITE_API;
    //   const respone = await axios
    //     .post(`${API}/employees-DayoffHist`, body)
    //     .catch((err) => {
    //       console.log("ERRO form respone", err);
    //       return err;
    //     });
    //   // console.log("respone", respone);
    //   this.employee = respone.data;
    //   return respone;
    // },
    async GET_HRData(body: object) {
      // console.log("API", import.meta.env.VITE_API);
      console.log("type", body);
      let API = import.meta.env.VITE_API;
      const respone = await axios
        .post(`${API}/employees-report`, body)
        .catch((err) => {
          console.log("ERRO form respone", err);
          return err;
        });
      // console.log("respone", respone);
      this.employee = respone.data;
      return respone;
    },
    async GET_BranchUnit(body: object) {
      // console.log("API", import.meta.env.VITE_API);
      console.log("type", body);
      let API = import.meta.env.VITE_API;
      const respone = await axios
        .post(`${API}/employees-BranchUnit`, body)
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
