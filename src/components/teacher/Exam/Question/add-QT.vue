<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ props }">
      <v-btn
        class="bg-teal-lighten-4"
        rounded="lg"
        v-bind="props"
        @click="Onopen"
      >
        <v-icon class="mr-1"> fa-solid fa-plus </v-icon>
        {{ $t("addNew") }}
        <v-tooltip activator="parent" location="end">
          {{ $t("addNew") }}</v-tooltip
        >
      </v-btn>
    </template>
    <v-card rounded="lg">
      <v-form @submit.prevent="onSubmit">
        <v-card-title align="center" class="bg-blue-grey-darken-1">
          <h2>{{ $t("createquestion") }}</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="11" class="pa-0">
                <v-text-field
                  :label="$t('Question')"
                  :rules="[rules.required]"
                  class="my-2"
                  density="compact"
                  variant="outlined"
                  v-model="questionbinding"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-for="(item, i) in items" :key="i">
              <v-text-field
                :label="$t('option') + ' ' + (i + 1).toString()"
                :rules="[rules.required]"
                class="my-2"
                density="compact"
                variant="outlined"
                v-model="optionbinding[i.toString()]"
              ></v-text-field>
              <div class="d-inline-flex">
                <v-radio-group v-model="answer">
                  <v-radio :value="optionbinding[i]"></v-radio>
                </v-radio-group>
              </div>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider :thickness="2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="tonal"
            type="submit"
            @click="optionbinding !== `` ? (dialog = false) : (dialog = true)"
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
</template>

<script>
import { v4 as uuid } from "uuid";
import { useQuestionStore } from "@/stores/question";
export default {
  props: ["examID"],
  emit: ["addQT"],
  setup(props, { emit }) {
    const { getTime } = useGetDate();
    // const nuxtApp = useNuxtApp();
    const store = useQuestionStore();
    const dialog = ref(false);
    const questionbinding = ref("");
    const optionbinding = ref([]);
    const answer = ref("");
    const rules = ref({
      required: (value) => !!value || nuxtApp.$t("requiredInsert"),
      counter: (value) => value.length <= 20 || "Max 20 characters",
    });
    const Onopen = () => {
      questionbinding.value = "";
      answer.value = "";
      optionbinding.value = [];
    };
    const onSubmit = async () => {
      let body = {
        id: uuid(),
        question: questionbinding.value,
        options: optionbinding.value.toString(),
        answer: answer.value,
        examID: props.examID,
        time: getTime(),
        ACTION: "INSERT",
      };
      // console.log("body", body);
      if (body) {
        // nuxtApp.$openDialog();
        await store.CRUDQUESTION(body);
        emit("addQT", "added");
        console.log("body");
        // setTimeout(() => {
        //   nuxtApp.$closeDialog();
        // }, 800);
      }
    };

    return {
      dialog,
      optionbinding,
      questionbinding,
      rules,
      answer,
      Onopen,
      onSubmit,
    };
  },
  data: () => ({
    items: Array.from({ length: 4 }, (k, v) => v + 1),
  }),
};
</script>

<style lang="scss" scoped></style>
