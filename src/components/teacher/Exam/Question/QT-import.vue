<template>
  <v-form @submit.prevent="onSubmit">
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
        <ExamQuestionQTTemplate />
      </div>
    </div>
    <div v-if="excelData.length > 0">
      <v-card-title
        style="text-align: center"
        class="text-decoration-underline"
      >
        {{ $t("questionList") }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card class="overflow-y-auto">
        <v-card-text>
          <div v-for="(question, index) in excelData" :key="index">
            <v-row>
              <h2>{{ index + 1 }}.)</h2>
              <h2>{{ question.question }}</h2>
            </v-row>
            <v-row>
              <v-radio-group inline>
                <v-radio
                  v-for="(option, i) in question.options.split(',')"
                  :key="i"
                  color="primary"
                  :name="index.toString()"
                  :label="option"
                  :value="option"
                  :true-value="option"
                ></v-radio>
              </v-radio-group>
              <v-btn
                @click="removeData(question)"
                variant="text"
                density="compact"
                icon="fa-solid fa-plus"
                size="medium"
              >
                <v-icon style="color: red" icon="fa-regular fa-trash-can" />
                <v-tooltip activator="parent" location="top">
                  {{ $t("delete") }}
                </v-tooltip>
              </v-btn>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-divider :thickness="2"></v-divider>
    <v-card-actions>
      <v-btn
        @click="clearfile"
        :ripple="false"
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
      <v-btn color="blue-darken-1" variant="tonal" type="submit">
        <v-icon class="mx-1" icon="fa-regular fa-floppy-disk" />
        {{ $t("save") }}
      </v-btn>
      <v-btn color="red" variant="tonal" @click="DialogState">
        <v-icon class="mx-1" icon="fa-solid fa-xmark" />
        {{ $t("cancel") }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { v4 as uuid } from "uuid";
import { useQuestionStore } from "@/stores/question";
import * as XLSX from "xlsx";
export default {
  props: ["examID"],
  emit: ["addquestion", "DL"],
  setup(props, { emit }) {
    const excelData = ref([]);
    const store = useQuestionStore();
    const { getTime } = useGetDate();
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
        v.examID = props.examID;
        v.time = getTime();
        v.id = uuid();
        v.ACTION = "INSERT";
      });
      if (excelData.value) {
        var rs = "";
        for (let index = 0; index < excelData.value.length; index++) {
          rs = await store.CRUDQUESTION(excelData.value[index]);
        }

        if (rs) {
          nuxtApp.$openLoading();
          setTimeout(() => {
            nuxtApp.$closeDialog();
            // emit("addquestion", "added");
            emit("DL", false);
            nuxtApp.$closeLoading();
          }, 800);
        }
      }
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

    //----------------------------------
    const selectedAnswers = ref([]);

    const showResults = ref(false);

    const submitAnswers = () => {
      showResults.value = true;
    };
    const DialogState = () => {
      emit("DL", false);
    };
    const removeData = (question) => {
      excelData.value = excelData.value.filter((t) => t !== question);
    };
    return {
      removeData,
      DialogState,
      selected,
      clearfile,
      excelData,
      filecheck,
      excelExport,
      dialog,
      choice,
      onSubmit,
      onOpen,
      Qlist,
      submitAnswers,
      showResults,
      selectedAnswers,
    };
  },
  data: () => ({
    checkbox1: false,
    items: Array.from({ length: 50 }, (k, v) => v + 1),
  }),
};
</script>
