import { defineStore } from "pinia";
import axios from "axios";

export const useFingerStore = defineStore("finger", {
  state: () => ({
    fingerData: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchFingerData(branch = "LVB050", startDate = "2025-01-01", endDate = "2025-01-31") {
      this.loading = true;
      this.error = null;
      try {
        const API = import.meta.env.VITE_APII; // 
        const response = await axios.get(`${API}/api/finger`, {
          params: { branch, startDate, endDate },
        });

        if (response.data && response.data.data) {
          this.fingerData = response.data.data;
        } else {
          throw new Error("API");
        }
      } catch (error) {
        console.error("ERROR form respone:", error);
        this.error = error.response?.data?.message || "เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้";
      } finally {
        this.loading = false;
      }
    },
  },
});
