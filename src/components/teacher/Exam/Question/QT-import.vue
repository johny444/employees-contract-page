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
  emits: ["addquestion", "DL"],
  data() {
    return {
      excelData: [],
      dialog: false,
      choice: {},
      Qlist: [],
      selected: [],
      selectedAnswers: [],
      showResults: false,
      checkbox1: false,
      items: Array.from({ length: 50 }, (k, v) => v + 1),
    };
  },
  computed: {
    store() {
      return useQuestionStore();
    },
    getTime() {
      return this.$getTime(); // Assuming `$getTime()` is a global method
    },
  },
  methods: {
    async onOpen() {
      this.choice = {};
      this.selected = [];
      this.Qlist = this.store.getquestionList;
      this.Qlist.forEach((question, index) => {
        this.selectedAnswers[index] = [];
        question.answers.forEach((answer, answerIndex) => {
          this.selectedAnswers[index][answerIndex] = false;
        });
      });
    },
    async onSubmit() {
      this.excelData.forEach((v) => {
        v.examID = this.examID;
        v.time = this.getTime();
        v.id = uuid();
        v.ACTION = "INSERT";
      });
      if (this.excelData.length > 0) {
        let rs = "";
        for (let index = 0; index < this.excelData.length; index++) {
          rs = await this.store.CRUDQUESTION(this.excelData[index]);
        }

        if (rs) {
          this.loadingStore.openLoading();
          setTimeout(() => {
            this.AlertStore.closeDialog();
            this.$emit("DL", false);
            this.loadingStore.closeLoading();
          }, 800);
        }
      }
    },
    filecheck() {
      document.getElementById("excelFile").click();
    },
    excelExport(event) {
      const input = event.target;
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        const wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach((sheetName) => {
          const rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          this.excelData = rowObj;
        });
      };
      reader.readAsBinaryString(input.files[0]);
    },
    clearfile() {
      this.excelData = [];
    },
    submitAnswers() {
      this.showResults = true;
    },
    DialogState() {
      this.$emit("DL", false);
    },
    removeData(question) {
      this.excelData = this.excelData.filter((t) => t !== question);
    },
  },
  watch: {
    dialog(newValue) {
      if (newValue === false) {
        this.excelData = [];
      } else {
        this.excelData = [];
      }
    },
  },
  created() {
    // Initialize any necessary store data or logic when the component is created
    this.onOpen();
  },
};
</script>
