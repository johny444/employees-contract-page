// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useExamStore = defineStore("examStore", {
  state: () => ({
    examList: ref([]),
  }),
  getters: {
    getexamList: (state) => state.examList,
  },
  actions: {
    async CRUDEXAM(body: any) {
      const respone = await axios
        .post("http://localhost:8080/exam", body)
        .catch((err) => {
          console.log("ERRO form respone", err);
          return err;
        });
      // console.log("respone", respone);
      this.examList = respone.data;
      return respone;
    },
  },
});
