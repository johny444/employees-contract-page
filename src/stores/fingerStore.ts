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
          const API = import.meta.env.VITE_API; // ✅ แก้ไขให้ถูกต้อง
          const url = `${API}/api/finger`;

          if (import.meta.env.MODE === "development") {
              console.log("📢 Fetching data with:", { branch, startDate, endDate });
              console.log("API URL:", url);
          }

          const response = await axios.get(url, {
              params: { branch, startDate, endDate },
          });

          if (import.meta.env.MODE === "development") {
              console.log("📌 API Response:", response);
          }

          this.fingerData = response.data?.data || []; // ✅ ป้องกันข้อผิดพลาด

      } catch (error) {
          console.error("🚨 ERROR:", error);
          if (error.response) {
              console.error("Error Response Data:", error.response.data);
              console.error("Error Response Status:", error.response.status);
              console.error("Error Response Headers:", error.response.headers);
              this.error = error.response?.data?.message || "ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่";
          } else {
              this.error = "เกิดข้อผิดพลาด กรุณาตรวจสอบการเชื่อมต่อ";
          }
      } finally {
          this.loading = false;
      }
    }
  }
});
