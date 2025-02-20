<template>
  <v-menu v-model="isOpen" offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        variant="outlined"
        v-bind="props"
        :append-icon="
          isOpen ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
        "
      >
        {{ defalutTitle }}
      </v-btn>
    </template>
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
</template>
    
    <script>
export default {
  props: ["defalutTitle", "items"],
  emits: ["update-Type"], // Declare the emitted event
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    selectItem(value) {
      console.log("Selected:", value);
      this.$emit("update-Type", value); // Emit the selected value
    },
  },
};
</script>
    