<template>
  <div>
    <v-app id="inspire">
      <Header />
      <v-main>
        <v-container class="py-8 px-6" fluid>
          <v-row>
            <v-col>
              <v-navigation-drawer :rail="rail" permanent @click="rail = false">
                <v-list>
                  <profile @toggle-rail="toggleRail" />
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
                  <div class="pa-2">
                    <v-btn block> Logout </v-btn>
                  </div>
                </template>
              </v-navigation-drawer>
              <slot />
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
        ["fa-solid fa-gear", "Dashboard", "/dashboard"],
        ["fa-solid fa-gear", "classExam", "/class"],
        ["fa-solid fa-gear", "exam", "/exam"],
        ["fa-solid fa-gear", "result", "/result"],
      ],
    };
  },

  methods: {
    toggleRail() {
      console.log("rail");
      this.rail = !this.rail;
    },
    onClick() {
      console.log("route.params", this.route.params);
    },
  },
};
</script>

  