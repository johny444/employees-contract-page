<template>
  <div>
    <contract />
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { useI18n } from "vue-i18n";
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
    this.storeUser = useUserStore();
    this.loadingStore = useLoadingStore();
  },
};
</script>


<style scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  padding: 0px;
  overflow: hidden;
}
.normal_gradient {
  background: radial-gradient(circle, #35a2ff 0%, #28c2e5 100%);
  background-image: url(@/assets/images/background.jpg);
}
.loginCard {
  position: absolute;
  width: 20%;
  left: 10%;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
</style>


