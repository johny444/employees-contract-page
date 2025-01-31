<template>
  <div>
    Items per page:
    <v-btn variant="outlined">
      {{ pageProp }}
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="selectItem(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>
  
  <script>
export default {
  props: ["pageProp"],
  emits: ["update-pageProp"], // Declare the emitted event
  data() {
    return {
      items: [
        { title: "10" },
        { title: "20" },
        { title: "30" },
        { title: "40" },
        { title: "50" },
      ],
    };
  },
  methods: {
    selectItem(value) {
      console.log("Selected:", value);
      this.$emit("update-pageProp", value); // Emit the selected value
    },
  },
};
</script>
  