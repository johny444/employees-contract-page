// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useResultStore = defineStore("resultStore", {
  state: () => ({
    resultList: ref([]),
    ExamlistRS: ref([]),
  }),
  getters: {
    getresultList: (state) => state.resultList,
  },
  actions: {
    async CRUDRESULT(body: any) {
      const respone = await axios
        .post("http://localhost:8080/result", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      // console.log("respone", respone);
      this.resultList = respone.data;
      return respone;
    },
    async GetExamlistRS(body: Array<object>) {
      this.ExamlistRS = body;
      // console.log("object", this.ExamlistRS);
    },
  },
});
