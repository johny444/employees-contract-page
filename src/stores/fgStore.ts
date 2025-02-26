// @ts-ignore
import { defineStore } from "pinia";
import { ref } from "vue"; // Import ref for reactivity
import axios from "axios";

export const useFgStore = defineStore("FgStore", {
  state: () => ({
    units: [], // Reactive state to hold units
    loading: false, // Reactive state to indicate loading status
    error: null, // Reactive state for error handling
  }),
  actions: {
    async GET_UNITS() {
      this.loading = true; // Set loading to true before the request
      this.error = null; // Reset error state

      try {
        const API = import.meta.env.VITE_APII; // Get the base API URL from environment variables
        const response = await axios.get(`${API}/api/units`); // Make a GET request to fetch units
        this.units = response.data.DATA; // Update the units state with the fetched data
      } catch (err) {
        console.error("Error fetching units:", err);
        this.error = err.response?.data?.MESSAGE || 'Error fetching units'; // Set error message
      } finally {
        this.loading = false; // Set loading to false after the request completes
      }
    },
  },
});
