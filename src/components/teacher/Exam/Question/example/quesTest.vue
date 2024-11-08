<template>
  <div>
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          density="compact"
          icon="fa-solid fa-plus"
          size="medium"
          v-bind="props"
          @click="onOpen"
        >
          <v-icon
            style="color: #006064"
            icon="fa-brands fa-creative-commons-share"
            size="20"
          ></v-icon>
          <v-tooltip activator="parent" location="top">{{
            $t("questionList")
          }}</v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title align="center" class="bg-light-blue-darken-4">
            <h2>{{ $t("createquestion") }}</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <div
                elevation="12"
                border="lg opacity-12"
                width="100%"
                class="pa-4 text-center mx-auto"
                style="border-style: dashed"
              >
                <v-icon
                  class="mb-5"
                  color="blue-darken-2"
                  icon="fa-solid fa-download"
                  size="50"
                  @click="filecheck"
                ></v-icon>
                <div>
                  <input
                    type="file"
                    id="excelFile"
                    @change="excelExport"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style="display: none"
                  />
                </div>
                <div class="d-inline-flex">
                  <h2 class="mb-6">{{ $t("selectfile") }}.</h2>
                  <ClassStudentStdExport />
                </div>
              </div>
              <div>
                <v-card-title
                  style="text-align: center"
                  class="text-decoration-underline"
                >
                  {{ $t("item") }}
                  <!-- <v-checkbox
                    v-model="checkbox1"
                    :label="`Checkbox 1: ${checkbox1.toString()}`"
                  ></v-checkbox> -->
                </v-card-title>
                <v-divider></v-divider>
                <v-card class="overflow-y-auto" max-height="300">
                  <v-card-text>
                    <div v-for="(question, index) in Qlist" :key="index">
                      <h2>{{ question.question }}</h2>
                      <v-radio-group inline>
                        <v-radio
                          v-for="(answer, i) in question.answers"
                          :key="i"
                          color="primary"
                          :name="index.toString()"
                          :label="answer.text"
                          :value="answer.text"
                          :true-value="answer.text"
                          v-model="selectedAnswers[index][i]"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                    <!-- <template v-else>
                      <div v-for="(question, index) in Qlist" :key="index">
                        <h2>{{ question.question }}</h2>
                        {{ index }}
                        <v-row>
                          <v-checkbox
                            v-for="(answer, i) in question.answers"
                            :key="i"
                            v-model="selectedAnswers[index][i]"
                            :label="answer.text"
                            :value="answer.text"
                            :name="index.toString()"
                            @change="getChoice"
                          ></v-checkbox>
                        </v-row>
                      </div>
                    </template> -->
                  </v-card-text>
                </v-card>
              </div>
            </v-container>
          </v-card-text>
          <v-divider :thickness="2"></v-divider>
          <v-card-actions>
            <v-btn
              @click="clearfile"
              variant="text"
              density="compact"
              icon="fa-brands fa-x-twitter"
              size="medium"
            >
              <v-icon style="color: red" icon="fa-brands fa-x-twitter" />
              <v-tooltip activator="parent" location="end">
                {{ $t("deletedatafile") }}
              </v-tooltip>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="tonal"
              type="submit"
              @click="
                fullname && studentCode && birthday && password !== ``
                  ? (dialog = false)
                  : (dialog = true)
              "
            >
              <v-icon class="mx-1" icon="fa-regular fa-floppy-disk" />
              {{ $t("save") }}
            </v-btn>
            <v-btn color="red" variant="tonal" @click="dialog = false">
              <v-icon class="mx-1" icon="fa-solid fa-xmark" />
              {{ $t("cancel") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { useQuestionStore } from "@/stores/question";
import * as XLSX from "xlsx";
export default {
  props: [""],
  emit: ["addstudent"],
  setup(props, { emit }) {
    const excelData = ref([]);
    const store = useQuestionStore();
    const router = useRouter();
    const currentRoute = router.currentRoute;
    const { getTime } = useGetDate();
    const { generatePassword } = useGeneratepassword();
    // const nuxtApp = useNuxtApp();
    const dialog = ref(false);
    const choice = ref({});
    const Qlist = ref([]);
    const selected = ref([]);
    const onOpen = async () => {
      choice.value = {};
      selected.value = [];
      // await store.acGetquestionList();
      Qlist.value = store.getquestionList;
      Qlist.value.forEach((question, index) => {
        selectedAnswers.value[index] = [];
        question.answers.forEach((answer, answerIndex) => {
          selectedAnswers.value[index][answerIndex] = false;
        });
      });
    };
    const onSubmit = async () => {
      excelData.value.map((v) => {
        v.password = generatePassword();
        v.time = getTime();
        v.classExamId = currentRoute.value.params.student;
        v.id = uuid();
      });
      if (excelData.value) {
        var rs = "";
        for (let index = 0; index < excelData.value.length; index++) {
          rs = await store.acCreatestudentList(excelData.value[index]);
        }
        console.log("rs", rs);
        if (rs) {
          console.log("submit");
          nuxtApp.$openAlertSC();
          setTimeout(() => {
            nuxtApp.$closeDialog();
            emit("addstudent", "added");
            nuxtApp.$closeLoading();
          }, 800);
        }
      }
    };
    const onChange = () => {
      console.log("choice", choice.value);
    };

    const filecheck = () => {
      document.getElementById("excelFile").click();
    };
    const excelExport = (event) => {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          excelData.value = rowObj;
        });
      };

      reader.readAsBinaryString(input.files[0]);
    };
    watch(dialog, (currentValue, oldValue) => {
      if (currentValue === false) {
        excelData.value = [];
      } else {
        excelData.value = [];
      }
    });
    const clearfile = () => {
      excelData.value = [];
    };
    const getChoice = (e) => {
      console.log("selected.value ", e.target.name);
      choice.value = { ...choice.value, [e.target.name]: e.target.value };
      // choice.value = { ...choice.value, [e.target.name]: selected.value };
    };
    //----------------------------------
    const selectedAnswers = ref([]);

    const showResults = ref(false);

    const totalQuestions = computed(() => {
      return Qlist.value.length;
    });
    const score = computed(() => {
      let total = 0;
      Qlist.value.forEach((question, index) => {
        question.answers.forEach((answer, answerIndex) => {
          if (answer.correct && selectedAnswers.value[index][answerIndex]) {
            total++;
          }
        });
        console.log("total", total);
      });
      return total;
    });
    const submitAnswers = () => {
      console.log("submitAnswers");
      showResults.value = true;
    };
    return {
      selected,
      getChoice,
      clearfile,
      excelData,
      filecheck,
      excelExport,
      dialog,
      choice,
      onSubmit,
      onOpen,
      onChange,
      Qlist,
      totalQuestions,
      score,
      submitAnswers,
      showResults,
      selectedAnswers,
    };
  },
  data: () => ({
    checkbox1: false,
    items: Array.from({ length: 50 }, (k, v) => v + 1),
  }),

  methods: {
    nextPage() {
      currentIndex++;
    },
    prevPage() {
      currentIndex--;
    },
  },
  created() {},
};
</script>
