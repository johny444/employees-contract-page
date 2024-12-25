<template>
  <div>
    <v-row no-gutters>
      <v-col align="end" cols="9">
        <!-- <v-avatar
        image="https://th.bing.com/th/id/OIP.40GYfHQgA5nphad0oLAfjQHaHa?w=214&h=214&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        size="120"
      ></v-avatar> -->
        <v-avatar
          image="https://th.bing.com/th/id/OIP.6YS0Z_aH7ynJROf5YaKfRgHaHa?w=201&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          size="120"
        ></v-avatar>
      </v-col>
      <v-col align="end">
        <v-icon
          class="px-3"
          style="font-size: 20px"
          color="white"
          @click.stop="$emit('toggle-rail')"
          >fa-solid fa-circle-chevron-left</v-icon
        >
      </v-col>
    </v-row>
    <v-col class="d-flex flex-column align-center">
      <h3 class="text-center">{{ $t("info") }}</h3>
      <div>
        <p>{{ $t("name") }}: {{ user.name }}</p>
        <p>{{ $t("email") }}: {{ user.email }}</p>
        <p>{{ $t("phoneNumber") }}: {{ user.phone }}</p>
        <p>{{ $t("birthday") }}: {{ user.birthday }}</p>
      </div>
    </v-col>
    <!-- <v-card-actions>
      <v-btn block @click="logout">
        {{ $t("logOut") }}
      </v-btn>
    </v-card-actions> -->
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      user: "", // Initialize user as an empty string or adjust as needed
    };
  },
  methods: {
    async fetchUser() {},
    logout() {
      // localStorage.removeItem("token");
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
