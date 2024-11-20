<template>
  <div>
    <v-app id="inspire">
      <Header />
      <v-main>
        <v-container class="py-8 px-6" fluid>
          <v-row>
            <v-col>
              <v-navigation-drawer
                :rail="rail"
                permanent
                class="bg-cyan-darken-4"
              >
                <v-row class="pt-2">
                  <v-col align="end">
                    <v-icon
                      @click="rail = false"
                      v-if="rail"
                      class="px-3"
                      style="font-size: 20px"
                      color="white"
                      >fa-solid fa-square-caret-right</v-icon
                    >
                  </v-col>
                </v-row>
                <v-list>
                  <template v-if="!rail">
                    <profile @toggle-rail="toggleRail" />
                  </template>
                  <v-list-item
                    border
                    v-for="[icon, text, routing] in links"
                    :key="icon"
                    :prepend-icon="icon"
                    :title="$t(text)"
                    link
                    :to="routing"
                  >
                  </v-list-item>
                </v-list>
                <template v-slot:append>
                  <div class="pa-2" align="center">
                    <template v-if="rail">
                      <v-icon
                        @click="logout"
                        style="font-size: 20px"
                        icon="fa-solid fa-power-off"
                      >
                      </v-icon>
                      <v-tooltip activator="parent" location="end">
                        {{ $t("logOut") }}</v-tooltip
                      >
                    </template>
                    <v-btn v-else block @click="logout">
                      {{ $t("logOut") }}
                    </v-btn>
                  </div>
                </template>
              </v-navigation-drawer>

              <v-container max-width="90%">
                <slot />
              </v-container>
            </v-col>
            <!-- <v-col cols="6" md="3">
              <profile />
            </v-col> -->
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
  
<script>
export default {
  name: "teacherLayout",
  data() {
    return {
      drawer: true,
      rail: false,
      links: [
        ["fa-solid fa-table-columns", "Dashboard", "/dashboard"],
        ["fa-solid fa-chalkboard-user", "classExam", "/class"],
        ["fa-solid fa-clipboard-question", "exam", "/exam"],
        ["fa-solid fa-sheet-plastic", "result", "/result"],
      ],
    };
  },

  methods: {
    toggleRail() {
      this.rail = !this.rail;
      console.log("rail", this.rail);
    },
    onClick() {
      console.log("route.params", this.route.params);
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
};
</script>

  