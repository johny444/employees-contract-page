// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userList: ref([]),
    islogin: ref(false),
  }),
  getters: {
    getuserList: (state) => state.userList,
    getLoginState: (state) => state.islogin,
  },
  actions: {
    async acGetuserList(body: string) {
      // console.log("user store");
      const respone = await axios
        .get("http://localhost:8080/Auth", {
          headers: { Authorization: `Bearer ${body}` },
        })
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
        });
      // console.log("respone user:", respone);
      this.userList = respone.data;
    },
    async aclogIn() {
      this.islogin = true;
      // console.log(" this.islogin", this.islogin);
    },
    async aclogOut() {
      localStorage.removeItem("token");
      this.islogin = false;
      console.log("aclogOut", this.islogin);
    },
  },
});
