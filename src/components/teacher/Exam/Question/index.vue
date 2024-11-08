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
              <ExamQuestionQTList :examID="props.examID" />
            </v-window-item>
            <v-window-item value="two">
              <ExamQuestionQTImport
                :examID="props.examID"
                @DL="receiveDialog"
              />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useQuestionStore } from "@/stores/question";
export default {
  props: ["examID"],
  setup(props) {
    const store = useQuestionStore();
    const dialog = ref(false);
    const choice = ref({});
    const Qlist = ref([]);
    const selected = ref([]);
    const onOpen = async () => {
      choice.value = {};
      selected.value = [];
      // await store.QUESTIONFILER(props.examID);
      // console.log("store.questionfilter", store.questionfilter);
      // Qlist.value = store.questionfilter;
    };
    const receiveDialog = (v) => {
      console.log("receiveDialog", v);
      dialog.value = v;
    };
    return {
      receiveDialog,
      dialog,
      onOpen,
      props,
    };
  },
  data: () => ({
    checkbox1: false,
    items: Array.from({ length: 50 }, (k, v) => v + 1),
    tab: null,
  }),
};
</script>
