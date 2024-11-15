<template>
  <!-- <div><v-sheet rounded="lg" min-height="268" class="bg-green"> </v-sheet></div> -->
  <v-card class="mx-auto" max-width="280">
    <v-card-title align="center">
      <!-- <v-avatar
        image="https://th.bing.com/th/id/OIP.40GYfHQgA5nphad0oLAfjQHaHa?w=214&h=214&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        size="130"
      ></v-avatar> -->
      <v-avatar
        image="https://th.bing.com/th/id/OIP.6YS0Z_aH7ynJROf5YaKfRgHaHa?w=201&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        size="130"
      ></v-avatar>

      <h3>{{ user.fullname }}</h3>
    </v-card-title>
    <v-card-text>
      <h3>{{ $t("info") }}</h3>
      <p>{{ $t("email") }}:{{ user.email }}</p>

      <p>{{ $t("phoneNumber") }}: {{ user.phone }}</p>

      <p>{{ $t("birthday") }}:{{ user.birthday }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="logout">
        {{ $t("logOut") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useClassStore } from "@/stores/class";

export default {
  name: "profile",
  data() {
    return {
      user: "", // Initialize user as an empty string or adjust as needed
    };
  },
  computed: {
    // Define any computed properties here if needed
  },
  methods: {
    async fetchUser() {
      // console.log("profile mount");
      try {
        // Assuming you would use `storeUser` to fetch user data
        const storeUser = useUserStore();
        await storeUser.acGetuserList(localStorage.getItem("token"));
        this.user = storeUser.getuserList.user[0];
      } catch (error) {
        console.error("Error fetching user:", error);
        // Optionally open a dialog or handle error as needed
      }
    },
    logout() {
      localStorage.removeItem("token");
      try {
        this.$router.push("/");
      } catch (error) {
        console.error("Error during logout redirect:", error);
      }
    },
  },
  mounted() {
    this.fetchUser(); // Call fetchUser on component mount
  },
};
</script>


<style lang="scss" scoped></style>
