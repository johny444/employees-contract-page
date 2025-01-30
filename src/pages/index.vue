<template>
  <div>
    <main-container />
  </div>
</template>

<script>
import { useLoadingStore } from "@/stores/loadingStore";

export default {
  data() {
    return {
      myForm: null,
      // txtUseremail: "teacher2@gmail.com",
      txtUseremail: "TestB@gmail.com",
      txtPassword: "12345",
      showPw: false,
      userlist: [],
      loading: false,
    };
  },
  watch: {
    loading(val) {
      if (!val) return;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.loadingStore.openLoading();
        this.$router.push("/dashboard");
        this.loadingStore.closeLoading();
      } catch (error) {
        console.error("Error in form login", error);
        // Optionally open dialog for error
      }
    },
  },
  mounted() {
    this.$i18n.locale = localStorage.getItem("i18n") || "en"; // Set locale on mounted
  },
  created() {
    this.loadingStore = useLoadingStore();
  },
};
</script>


<style scoped>
</style>


