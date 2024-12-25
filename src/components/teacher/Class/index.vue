<template>
  <div>
    <h1>/classPage</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // Replaces ref([])
      loadingStore: useLoadingStore(),
    };
  },

  mounted() {
    this.ClassExam(); // Equivalent to onMounted
  },
  methods: {
    async ClassExam() {},
    async receiveCUD(v) {},
  },
};
</script>

<style scoped></style>
