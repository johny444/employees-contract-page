<template>
  <div>
    <v-dialog v-model="dialog" scrollable fullscreen>
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
            icon="fa-solid fa-clipboard-question"
            size="20"
          ></v-icon>
          <v-tooltip activator="parent" location="top">{{
            $t("questionList")
          }}</v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="bg-light-blue-darken-4">
          <v-row>
            <v-col>
              <h2>{{ $t("questionList") }}</h2></v-col
            >
            <v-col style="text-align: end">
              <v-btn
                icon="fa-solid fa-xmark"
                variant="text"
                @click="dialog = false"
              ></v-btn
            ></v-col>
          </v-row>
        </v-card-title>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="one">{{ $t("createquestion") }}</v-tab>
          <v-tab value="two"> {{ $t("addbyexcel") }}</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one" align="center">
              <QTList :examID="props.examID" />
            </v-window-item>
            <v-window-item value="two">
              <QTImport :examID="props.examID" @DL="receiveDialog" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useQuestionStore } from "@/stores/question";
import QTList from "./QT-List.vue";
import QTImport from "./QT-import.vue";

export default {
  components: {
    QTList,
    QTImport,
  },
  data() {
    return {
      dialog: false,
      choice: {},
      Qlist: [],
      selected: [],
      checkbox1: false,
      items: Array.from({ length: 50 }, (k, v) => v + 1),
      tab: null,
    };
  },
  methods: {
    async onOpen() {
      this.choice = {};
      this.selected = [];
      // await this.store.QUESTIONFILER(this.examID);
      // console.log("store.questionfilter", this.store.questionfilter);
      // this.Qlist = this.store.questionfilter;
    },
    receiveDialog(v) {
      console.log("receiveDialog", v);
      this.dialog = v;
    },
  },
  created() {
    this.store = useQuestionStore();
  },
};
</script>
