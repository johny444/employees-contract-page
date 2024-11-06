// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useQuestionStore = defineStore("questionStore", {
  state: () => ({
    questionList: ref([]),
    questionfilter: ref([]),
  }),
  getters: {
    getquestionList: (state) => state.questionList,
  },
  actions: {
    async CRUDQUESTION(body: any) {
      const respone = await axios
        .post("http://localhost:8080/question", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      // console.log("respone", respone);
      this.questionList = respone;
      return respone;
    },
    async QUESTIONFILER(examID: string) {
      console.log("userID", examID);
      const respone = await axios
        .post("http://localhost:8080/question", { ACTION: "GETAll" })
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      // console.log("respone", respone);
      this.questionfilter = respone.data.DATA.filter((v) => {
        return v.examID === examID;
      });
      // console.log(" store", this.questionfilter);
      // return respone;
    },
    async acGetquestionList() {
      const respone = await axios
        .get("http://localhost:3005/questions")
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      this.questionList = respone.data;
    },
    async acCreatequestion(body: any) {
      const respone = await axios
        .post("http://localhost:3005/questions", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      console.log("rs", respone);
      return respone.status;
    },
    async acUpdatequestionList(id: string, body: any) {
      const respone = await axios
        .put(`http://localhost:3005/questions/${id}`, body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      return respone;
    },
    async acDelquestion(body: any) {
      console.log("store", body);
      const respone = await axios
        .delete(`http://localhost:3005/questions/${body}`)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      console.log("respone", respone);
      return respone;
    },
  },
});
