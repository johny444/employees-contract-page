<template>
  <div>
    <v-row>
      <v-col>
        <h1>DashBoard</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-sheet
        v-for="[color, name, count, icon] in list"
        :key="color"
        elevation="4"
        height="200"
        max-width="800"
        width="30%"
        rounded
        :class="`mx-2 bg-${color}`"
      >
        <v-container>
          <v-row>
            <v-col>
              <p style="font-size: 2rem">{{ $t(`${name}`) }}</p>

              <v-divider :thickness="5" class="my-3"></v-divider>
              <h1>{{ count }}</h1>
            </v-col>
            <v-col cols="4">
              <v-icon style="font-size: 5rem"> {{ icon }} </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
    <v-row>
      <onlineList />
    </v-row>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      list: [
        ["cyan-accent-4", "Student", "50", "fa-regular fa-user"],
        ["pink-accent-3", "Teacher", "2", "fa-solid fa-user-tie"],
        ["orange-darken-4", "exam", "3", "fa-solid fa-file-circle-question"],
      ],
    };
  },
  mounted() {
    console.log("dashboard hello", this.getTime());
  },
  methods: {
    getTime() {
      return new Date().toLocaleTimeString();
    },
  },
};
</script>


<style scoped></style>
