<template>
  <div><h1>Test Dynamic page</h1></div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    async onSubmit() {},
  },
  mounted() {
    this.$i18n.locale = localStorage.getItem("i18n") || "en"; // Set locale on mounted
    console.log("id:", this.$route.query.id);
    console.log("name:", this.$route.query.name);
  },
};
</script>

<style lang="scss" scoped>
</style>