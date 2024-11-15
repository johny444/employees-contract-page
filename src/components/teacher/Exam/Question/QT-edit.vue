<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ props }">
      <v-btn
        :ripple="false"
        variant="text"
        density="compact"
        icon="fa-solid fa-file-pen"
        size="medium"
        v-bind="props"
        @click="Onopen"
      >
        <v-icon style="color: #388e3c" icon="fa-solid fa-file-pen"></v-icon>
        <v-tooltip activator="parent" location="start">{{
          $t("edit")
        }}</v-tooltip>
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
import { useQuestionStore } from "@/stores/question";

export default {
  props: ["examID", "data"],
  emits: ["updateQT"],
  data() {
    return {
      AlertStore: useAlertStore(),
      dialog: false,
      questionbinding: this.data.question,
      optionbinding: this.data.options.split(","),
      answer: this.data.answer,
      rules: {
        required: (value) => !!value || this.$t("requiredInsert"),
        counter: (value) => value.length <= 20 || "Max 20 characters",
      },
      items: Array.from({ length: 4 }, (k, v) => v + 1),
    };
  },
  methods: {
    Onopen() {
      this.questionbinding = this.data.question;
      this.answer = this.data.answer;
      this.optionbinding = this.data.options.split(",");
    },
    async onSubmit() {
      const body = {
        id: this.data.id,
        question: this.questionbinding,
        options: this.optionbinding.toString(),
        answer: this.answer,
        examID: this.data.examID,
        time: this.getTime(),
        ACTION: "UPDATE",
      };

      if (body) {
        this.AlertStore.openDialog("S", this.$t("updateDataSuccess")); // Assuming you still want to use nuxtApp
        await this.store.CRUDQUESTION(body);
        this.$emit("updateQT", "updated");
        setTimeout(() => {
          this.AlertStore.closeDialog();
        }, 800);
      }
    },
  },
  created() {
    // Initialize store for this component
    this.store = useQuestionStore();
    // Optional: You can initialize additional data if needed
  },
};
</script>


<style lang="scss" scoped></style>
