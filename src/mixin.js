import moment from "moment";
export default {
  data() {
    return {};
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
    logout() {
      localStorage.removeItem("token");
      try {
        this.$router.push("/");
      } catch (error) {
        console.error("Error during logout redirect:", error);
      }
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
    // formatDate(date) {
    //   return moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
    // },
    formatDate(date) {
      return moment(date).format("DD-MMM-YYYY");
    },
    formatDateShow(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
};
