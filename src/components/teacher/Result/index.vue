<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("gradeExam") }}</h1>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],

      loadingStore: useLoadingStore(),
    };
  },
  mounted() {
    console.log("result mount");
    this.ClassExam();
    // this.getExam();
  },
  computed: {},
  methods: {
    ClassExam() {},
  },
};
</script>

