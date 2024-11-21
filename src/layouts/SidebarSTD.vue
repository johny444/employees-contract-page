<template>
  <div>
    <div>
      <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>
        <v-app-bar-title>{{ $t("examinationSystem") }}</v-app-bar-title>
        <LangSwitcher />
        <v-btn
          class="px-2"
          variant="text"
          density="compact"
          icon="fa-solid fa-right-from-bracket"
          size="medium"
          @click="logout()"
        >
          <v-icon icon="fa-solid fa-right-from-bracket"></v-icon>
          <v-tooltip activator="parent" location="start">{{
            $t("logOut")
          }}</v-tooltip>
        </v-btn>
      </v-app-bar>
    </div>
    <v-navigation-drawer v-model="drawer" permanent>
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-row>
          <v-col class="text-center pa-0">
            <div>
              <template v-if="user.gender === '0'">
                <v-avatar
                  image="https://th.bing.com/th/id/OIP.6-C1zVUDGDeY-GqQJiuCfAHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  size="64"
                ></v-avatar
              ></template>
              <template v-else>
                <v-avatar
                  image="https://th.bing.com/th/id/OIP.IB0XUg8PV5FGxOf0WWDdOQHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  size="64"
                ></v-avatar>
              </template>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="pa-0"></v-col>
          <v-col>
            <div>
              <h3>{{ $t("studentName") }}:{{ user.name }}</h3>
              <h3>{{ $t("birthday") }}:{{ user.birthday }}</h3>
              <h3>{{ $t("email") }}:{{ user.email }}</h3>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
      <v-list>
        <v-list-item
          v-for="[icon, text, routing] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="$t(text)"
          link
          :to="routing"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

export default {
  props: ["user"],
  data() {
    return {
      drawer: null,
      token: "",
      user: [],
      storeUser: useUserStore(),
      links: [
        ["fa-solid fa-gear", "exam", "/quiz"],
        ["fa-solid fa-gear", "exam", "/resultSTD"],
        ["fa-solid fa-gear", "", ""],
        ["fa-solid fa-gear", "", ""],
      ],
    };
  },
  computed: {
    route() {
      return useRoute();
    },
  },
  methods: {
    async fetchUser() {
      // console.log("token", localStorage.getItem("token"));
      this.token = localStorage.getItem("token");
      await this.storeUser.acGetuserList(this.token);
      this.user = this.storeUser.getuserList.user[0];
      // console.log("user:", this.user);
    },
    onClick() {
      console.log("route.params", this.route.params);
    },
  },
  mounted() {
    console.log("STD navbar");
    this.fetchUser();
  },
};
</script>


<style></style>
