<template>
  <div>
    <h1>/ExamPage</h1>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [],
      perPage: 10,
      loading: true, // Add loading state
      loadingStore: useLoadingStore(),
      store: useExamStore(),
      storeclass: useClassStore(),
      storeUser: useUserStore(),
      storeResult: useResultStore(),
    };
  },

  methods: {
    async ClassExam() {},
    receiveCUD(v) {
      console.log("Added", v);
      this.ClassExam();
    },
    onTableSearch() {},
    onPageChange(v) {
      const a = v.currenPage * v.perPage - v.perPage;
      this.tableData = [];
      try {
        for (let i = a; i < a + v.perPage; i++) {
          if (i < this.store.getexamList.length) {
            this.tableData.push(this.store.getexamList[i]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.ClassExam();
  },
};
</script>

<style scoped></style>
