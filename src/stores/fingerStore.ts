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
          const API = import.meta.env.VITE_APII;
          const url = `${API}/api/finger`;
          console.log("📢 Fetching data with:", { branch, startDate, endDate });
          console.log("API URL:", url);
  
          const response = await axios.get(url, {
              params: { branch, startDate, endDate },
          });
  
          console.log("📌 API Response:", response);
          
          if (response.data && response.data.data) {
              this.fingerData = response.data.data;
          } else {
              console.error("Unexpected response structure:", response.data);
              throw new Error("Unexpected API response structure");
          }
      } catch (error) {
          console.error("🚨 ERROR:", error);
          if (error.response) {
              console.error("Error Response Data:", error.response.data);
              console.error("Error Response Status:", error.response.status);
              console.error("Error Response Headers:", error.response.headers);
              this.error = error.response.data?.message || "เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้";
          } else {
              this.error = "เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้";
          }
      } finally {
          this.loading = false;
      }
  }
  
  
  },
});
