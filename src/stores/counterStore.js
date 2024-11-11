// src/stores/counterStore.js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    // Getter to get the double of the count
    doubleCount: (state) => {
      return state.count * 2;
    },
    // Getter to get if the count is odd or even
    isEven: (state) => {
      return state.count % 2 === 0;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
