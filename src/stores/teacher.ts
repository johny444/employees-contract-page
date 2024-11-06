// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useTeacherStore = defineStore("teacherStore", {
  state: () => ({
    teacherList: ref([]),
  }),
  getters: {
    getteacherList: (state) => state.teacherList,
  },
  actions: {
    async CRUDTeacher(body: any) {
      const respone = await axios
        .post("http://localhost:8080/teacher", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      console.log("respone", respone);
      this.teacherList = respone;
    },
    async acGetteacherList() {
      const respone = await axios
        .get("http://localhost:3005/teachers")
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      this.teacherList = respone;
    },
    async acCreateteacherList(body: any) {
      const respone = await axios
        .post("http://localhost:3005/teachers", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
    },
    async acUpdateteacherList(id: string, body: any) {
      const respone = await axios
        .put(`http://localhost:3005/teachers/${id}`, body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
    },
    async acDelteacher(body: any) {
      console.log("sote", body);
      const respone = await axios
        .delete(`http://localhost:3005/teachers/${body}`)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      console.log("respone", respone);
    },
  },
});
