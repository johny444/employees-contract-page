<template>
  <v-app id="inspire">
    <SidebarSTD :user="user" />
    <v-main>
      <v-container max-width="90%">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import SidebarSTD from "@/layouts/SidebarSTD.vue";
export default {
  components: { SidebarSTD },
  name: "studentLayout",
  data() {
    return {
      token: "",
      user: "",
      storeUser: useUserStore(),
      items: [
        {
          title: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          title: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          title: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
  computed: {
    currentRoute() {
      return useRouter().currentRoute;
    },
  },
  methods: {
    async getUser() {
      this.token = localStorage.getItem("token");
      await this.storeUser.acGetuserList(this.token);
      this.user = this.storeUser.getuserList.user;
    },
  },
  mounted() {
    this.getUser();
    console.log("user:", this.user);
  },
};
</script>

  <style></style>
  