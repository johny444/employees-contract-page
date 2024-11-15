export default {
  data() {
    return {
      _storeQuestion: useQuestionStore(), // Initialize the store
    };
  },
  methods: {
    getTime() {
      var date = new Date();
      var d =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      var t =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return t + " " + d;
    },
    InsertClassExamInfoToExam(Exams, classExam) {
      return Exams.filter((exam) =>
        classExam.some((classItem) => classItem.id === exam.classExamid)
      );
    },
    async getQT(examID) {
      await this._storeQuestion.QUESTIONFILER(examID);
      return this._storeQuestion.questionfilter;
    },
  },
};
