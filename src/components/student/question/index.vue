<template>
  <v-app>
    <div class="container pa-3" @mouseleave="onMouseLeave">
      <v-row>
        <v-col class="sideleft" cols="2">
          <STDDashboardQuestionTimer />
          <div class="my-3"></div>
          <STDDashboardQuestionQshortcut :items="questionList" />
          <div style="height: 58%"></div>
          <v-row>
            <v-col style="text-align: end">
              <v-btn class="bg-teal-darken-1" @click="onSubmit()">{{
                $t("submit")
              }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-0">
          <div class="content">
            <div>
              <template v-if="questionList.length > 0">
                <div v-for="(item, i) in paginatedQuestions" :key="i">
                  <v-row>
                    <h2>{{ (page - 1) * itemsPerPage + i + 1 }}.)</h2>
                    <div class="mx-2"></div>
                    <h2>{{ item.question }}</h2>
                  </v-row>
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
            </div>
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

<script setup>
import { useQuestionStore } from "@/stores/question";
const nuxtApp = useNuxtApp();
const store = useQuestionStore();
const router = useRouter();
const currentRoute = router.currentRoute;
// console.log("currentRoute.path", currentRoute.value.params.question);
const examID = ref("");
const questionList = ref([]);
const page = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => {
  return Math.ceil(questionList.value.length / itemsPerPage);
});

const paginatedQuestions = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return questionList.value.slice(startIndex, endIndex);
});
onMounted(async () => {
  nuxtApp.$openLoading();
  examID.value = currentRoute.value.params.question;
  await store.CRUDQUESTION({ ACTION: "GETBYEXAMID", examID: examID.value });

  questionList.value = store.getquestionList.data.DATA;
  // console.log("object", questionList.value);
  questionList.value.forEach((question) => {
    question.selectedAnswer = null;
    question.isOptionSelected = false;
  });
  nuxtApp.$closeLoading();
});
const onSubmit = () => {
  let correctCount = 0;
  let isAnyQuestionUnanswered = false;
  questionList.value.forEach((question) => {
    if (!question.selectedAnswer) {
      isAnyQuestionUnanswered = true;
    } else if (question.selectedAnswer === question.answer) {
      correctCount++;
    }
  });

  if (isAnyQuestionUnanswered) {
    nuxtApp.$openDialog(
      "W",
      nuxtApp.$t("Pleaseanswerallquestionsbeforesubmitting")
    );
  } else {
    // alert(
    //   `You got ${correctCount} out of ${questionList.value.length} questions correct.`
    // );
    nuxtApp.$openDialog("S", `${nuxtApp.$t("submit")}${nuxtApp.$t("success")}`);
  }
};
const setOptionSelected = (question, selectedOption) => {
  question.isOptionSelected = true; // Set option selection status to true
  question.selectedAnswer = selectedOption; // Update selected answer
  // console.log("object", question);
};
var countMoveOut = 0;
const onMouseLeave = () => {
  // countMoveOut++;
  // nuxtApp.$openDialog("W", nuxtApp.$t(`NotAllowMoveOut`, { chance: 3 }));
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
.container {
  border: 0.3rem solid;
  border-color: red;
}
</style>
