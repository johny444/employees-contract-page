<template>
  <v-app>
    <div class="borderLineCheck pa-3" @mouseleave="onMouseLeave">
      <v-row>
        <v-col class="sideleft d-flex flex-column" cols="2">
          <timer />
          <div class="py-3" align="center">
            <h2>{{ breakRuleCheck }}</h2>
          </div>
          <!-- <Qshortcut :items="questionList" /> -->

          <checkList :items="questionList" />
          <!-- <div style="height: 58%"></div> -->
          <v-spacer></v-spacer>
          <div style="text-align: end">
            <v-btn
              style="background-color: #073a4b; color: white"
              @click="onSubmit()"
              >{{ $t("submit") }}</v-btn
            >
          </div>
        </v-col>
        <v-col class="pa-0">
          <div class="content">
            <examheader />
            <div class="py-4">
              <!-- <v-divider :thickness="2" inset></v-divider> -->
            </div>
            <v-container max-width="100%" class="pa-6">
              <template v-if="questionList.length > 0">
                <div v-for="(item, i) in paginatedQuestions" :key="i">
                  <v-row>
                    <h2>{{ (page - 1) * itemsPerPage + i + 1 }}.)</h2>
                    <div class="mx-2"></div>
                    <h2>{{ item.question }}</h2>
                  </v-row>
                  <div class="py-1"></div>
                  <v-radio-group inline v-model="item.selectedAnswer">
                    <v-radio
                      v-for="(option, j) in item.options.split(',')"
                      :key="j"
                      color="primary"
                      :name="j.toString()"
                      :label="option"
                      :value="option"
                      @click="setOptionSelected(item, option)"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </template>
            </v-container>
          </div>
          <div class="footer">
            <v-pagination
              v-model="page"
              :length="totalPages"
              rounded="circle"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      examID: "",
      questionList: [],
      page: 1,
      itemsPerPage: 10,
      countMoveOut: 0,
      store: useQuestionStore(),
      loadingStore: useLoadingStore(),
    };
  },
  computed: {
    breakRuleCheck() {
      return `BREAKING RULE : ${0} TIMES`;
    },
    totalPages() {
      return Math.ceil(this.questionList.length / this.itemsPerPage);
    },
    paginatedQuestions() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.questionList.slice(startIndex, endIndex);
    },
    currentRoute() {
      return useRouter().currentRoute;
    },
  },
  methods: {
    async fetchQuestions() {
      this.loadingStore.openLoading();
      this.examID = this.$route.params.question;
      await this.store.CRUDQUESTION({
        ACTION: "GETBYEXAMID",
        examID: this.examID,
      });

      this.questionList = this.store.getquestionList.data.DATA;
      this.questionList.forEach((question) => {
        question.selectedAnswer = null;
        question.isOptionSelected = false;
      });
      this.loadingStore.closeLoading();
    },
    onSubmit() {
      let correctCount = 0;
      let isAnyQuestionUnanswered = false;

      this.questionList.forEach((question) => {
        if (!question.selectedAnswer) {
          isAnyQuestionUnanswered = true;
        } else if (question.selectedAnswer === question.answer) {
          correctCount++;
        }
      });

      if (isAnyQuestionUnanswered) {
        this.nuxtApp.$openDialog(
          "W",
          this.nuxtApp.$t("Pleaseanswerallquestionsbeforesubmitting")
        );
      } else {
        this.nuxtApp.$openDialog(
          "S",
          `${this.nuxtApp.$t("submit")}${this.nuxtApp.$t("success")}`
        );
      }
    },
    setOptionSelected(question, selectedOption) {
      question.isOptionSelected = true;
      question.selectedAnswer = selectedOption;
    },
    onMouseLeave() {
      // this.countMoveOut++;
      // this.nuxtApp.$openDialog("W", this.nuxtApp.$t(`NotAllowMoveOut`, { chance: 3 }));
    },
  },
  mounted() {
    this.fetchQuestions();
  },
};
</script>

<style scoped>
.sideleft {
  background-color: #f2f2f2; /* Light gray background */
  padding: 20px;
}
.content {
  height: 93.7vh;
  font-size: 1rem;
  padding: 2rem;
}
.borderLineCheck {
  border: 0.3rem solid;
  border-color: red;
}
</style>
