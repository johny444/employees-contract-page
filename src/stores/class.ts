// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useClassStore = defineStore("classStore", {
  state: () => ({
    classExamList: ref([]),
    examclassfilter: ref([]),
  }),
  getters: {
    getclassExamList: (state) => state.classExamList,
  },
  actions: {
    async CRUDCLASSEXAM(body: any) {
      const respone = await axios
        .post("http://localhost:8080/classExam", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      // console.log("respone", respone);
      this.classExamList = respone.data;
      return respone;
    },
    async CLASSEXAMFILER(body: Array<object>, userID: string) {
      // console.log("body", body);
      // console.log("userID", userID);
      this.examclassfilter = body.filter((v) => {
        return v.teacherID === userID;
      });
      // console.log(" store", this.examclassfilter);
      // return respone;
    },
  },
});
