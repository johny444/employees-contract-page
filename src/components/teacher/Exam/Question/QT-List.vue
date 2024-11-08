<template>
  <div>
    <v-row>
      <v-col style="text-align: start">
        <ExamQuestionAddQT :examID="props.examID" @addQT="receiveCUD" />
      </v-col>
    </v-row>
    <template v-if="tableData.length > 0">
      <v-row>
        <v-col style="text-align: start">
          <v-card-title class="text-decoration-underline py-0">
            {{ $t("questionList") }}
          </v-card-title>
        </v-col>
        <v-col style="text-align: end" class="py-0">
          <div class="d-inline-flex mr-4">
            <v-checkbox-btn color="red" v-model="allChecked"></v-checkbox-btn>
            <ExamQuestionDelMultiQT :item="selected" @DelQT="receiveCUD" />
          </div>
        </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <v-table height="74vh">
            <tbody>
              <template v-if="tableData.length > 0">
                <tr v-for="(question, i) in tableData" :key="i">
                  <td width="10%">
                    <v-row class="mt-1">
                      <h2>{{ i + 1 }}.)</h2>
                      <h2>{{ question.question }}</h2>
                    </v-row>
                    <v-row>
                      <v-radio-group inline v-model="question.answer">
                        <v-radio
                          v-for="(option, i) in question.options.split(',')"
                          :key="i"
                          color="primary"
                          :name="i.toString()"
                          :label="option"
                          :value="option"
                          :true-value="option"
                        ></v-radio> </v-radio-group
                    ></v-row>
                  </td>
                  <td width="1%">
                    <v-row justify="center">
                      <v-spacer></v-spacer>
                      <ExamQuestionQTEdit
                        :data="question"
                        @updateQT="receiveCUD"
                      />
                      <v-checkbox-btn
                        color="red"
                        :value="question.id"
                        v-model="selected"
                      ></v-checkbox-btn>
                    </v-row>
                  </td>
                </tr>
              </template>
              <template v-else>
                <td :colspan="9">
                  <div style="margin-top: 1rem; text-align: center">
                    <NoData></NoData>
                  </div>
                </td>
              </template>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </template>
    <template v-else>
      <NoData></NoData>
    </template>
  </div>
</template>
<script>
import { useQuestionStore } from "@/stores/question";
export default {
  props: ["examID"],
  setup(props) {
    const selected = ref([]);
    const allChecked = ref(false);
    const store = useQuestionStore();
    const tableData = ref([]);
    const getQT = async () => {
      // await store.acGetquestionList();
      await store.QUESTIONFILER(props.examID);
      tableData.value = store.questionfilter;
      console.log("tableData.value:", tableData.value);
    };
    onMounted(() => {
      getQT();
    });
    const receiveCUD = async (v) => {
      getQT();
    };
    watch(allChecked, (currentValue, oldValue) => {
      if (currentValue) {
        tableData.value.map((v) => {
          if (selected.value.indexOf(v.id) === -1) {
            selected.value.push(v.id);
          }
        });
      } else {
        selected.value = [];
      }
    });
    return { tableData, props, selected, allChecked, receiveCUD };
  },
};
</script>

<style lang="scss" scoped></style>
