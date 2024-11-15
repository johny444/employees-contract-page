import moment from "moment";
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
    generatePassword() {
      var length = 10;
      let character = "";
      let passwordTemp = "";
      const string = "abcdefghijklmnopqrstuvwxyz";
      const numeric = "0123456789";
      const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

      while (passwordTemp.length < length) {
        const entity1 = Math.ceil(
          string.length * Math.random() * Math.random()
        );
        const entity2 = Math.ceil(
          numeric.length * Math.random() * Math.random()
        );
        const entity3 = Math.ceil(
          punctuation.length * Math.random() * Math.random()
        );
        let hold = string.charAt(entity1);
        hold = passwordTemp.length % 2 === 0 ? hold.toUpperCase() : hold;
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        passwordTemp = character;
      }
      passwordTemp = passwordTemp
        .split("")
        .sort(() => {
          return 0.5 - Math.random();
        })
        .join("");
      return passwordTemp.substr(0, length.value);
    },
    formatDate(date) {
      return moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
    },
    async getQT(examID) {
      await this._storeQuestion.QUESTIONFILER(examID);
      return this._storeQuestion.questionfilter;
    },
  },
};
