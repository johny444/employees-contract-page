// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useStudentStore = defineStore("studentStore", {
  state: () => ({
    studentList: ref([]),
    studentfilter: ref([]),
  }),
  getters: {
    getstudentList: (state) => state.studentList,
  },
  actions: {
    async CRUDStudent(body: any) {
      const respone = await axios
        .post("http://localhost:8080/student", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      this.studentList = respone.data;
      return respone;
    },
    async StudentFILER(examID: string) {
      const respone = await axios
        .post("http://localhost:8080/student", { ACTION: "GETAll" })
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      this.studentfilter = respone.data.DATA.filter((v) => {
        return v.ExamId === examID;
      });
      this.studentList = respone.data;
    },
    async acGetstudentList() {
      const respone = await axios
        .get("http://localhost:3005/students")
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      this.studentList = respone.data;
    },
    async acCreatestudentList(body: any) {
      const respone = await axios
        .post("http://localhost:8080/students", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      console.log("rs", respone);
      return respone;
    },
    async acUpdatestudentList(id: string, body: any) {
      const respone = await axios
        .put(`http://localhost:3005/students/${id}`, body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      return respone;
    },
    async acDelstudent(body: any) {
      console.log("store", body);
      const respone = await axios
        .delete(`http://localhost:3005/students/${body}`)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      console.log("respone", respone);
      return respone;
    },
  },
});
