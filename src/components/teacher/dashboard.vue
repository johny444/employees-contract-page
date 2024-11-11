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
              <v-icon style="font-size: 6rem"> {{ icon }} </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";

onMounted(() => {
  const instance = getCurrentInstance();
  console.log("instance", instance.proxy);
  if (instance) {
    // Accessing the mixin method from the instance
    const time = instance.proxy.getTime();
    console.log("dashboard hello", time); // This should print the current time
  }
});

const list = [
  ["cyan-accent-4", "Student", "50", "fa-regular fa-user"],
  ["pink-accent-3", "Teacher", "2", "fa-solid fa-user-tie"],
  ["orange-darken-4", "exam", "3", "fa-solid fa-file-circle-question"],
];
</script>

<style scoped></style>
