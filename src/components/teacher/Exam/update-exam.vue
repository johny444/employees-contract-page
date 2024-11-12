<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        density="compact"
        icon="fa-solid fa-plus"
        size="medium"
        v-bind="props"
        @click="onOpen"
        :ripple="false"
      >
        <v-icon
          style="color: rgb(16, 98, 212)"
          icon="fa-regular fa-pen-to-square"
        ></v-icon>
        <v-tooltip activator="parent" location="top">{{
          $t("edit")
        }}</v-tooltip>
      </v-btn>
    </template>
    <v-card rounded="lg">
      <v-form @submit.prevent="onSubmit">
        <v-card-title align="center" class="bg-teal-darken-2">
          <h2>{{ $t("updateExam") }}</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-combobox
              :rules="[rules.required]"
              v-model="subjectbinding"
              class="my-2"
              density="compact"
              :label="$t('subject')"
              :items="temp"
              item-title="subjectExam"
              item-value="id"
              variant="outlined"
              @update:model-value="OnSelect()"
            ></v-combobox>
            <v-text-field
              v-if="classbinding"
              :label="$t('term')"
              :rules="[rules.required]"
              class="my-2"
              density="compact"
              variant="outlined"
              v-model="classbinding"
              disabled
            ></v-text-field>
            <v-radio-group inline v-model="termbinding" direction>
              <v-radio
                color="primary"
                :label="$t('midterm')"
                value="mid"
              ></v-radio>
              <v-radio
                color="primary"
                :label="$t('finalterm')"
                value="final"
              ></v-radio>
            </v-radio-group>
          </v-container>
        </v-card-text>
        <v-divider :thickness="2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="tonal"
            type="submit"
            @click="subjectbinding !== `` ? (dialog = false) : (dialog = true)"
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
import { useExamStore } from "@/stores/exam";

export default {
  name: "update-exam",
  props: ["data", "classlist"],
  emit: ["updateExam"],
  data() {
    return {
      dialog: false,
      subjectbinding: "",
      classbinding: "",
      termbinding: "mid",
      temp: null,
      rules: {
        required: (value) => !!value || this.$t("requiredInsert"),
      },
    };
  },
  methods: {
    async onOpen() {
      console.log("props", this.data);
      this.subjectbinding = this.data.classExamid;
      this.classbinding = this.data.classExamid.classExam;
      this.termbinding = this.data.term;
      this.temp = this.classlist;
      console.log("temp", this.temp);
    },
    async onSubmit() {
      console.log("subjectbinding", this.subjectbinding);
      let body = {
        id: this.data.id,
        classExamid: this.subjectbinding.id,
        term: this.termbinding,
        time: this.getTime(),
        ACTION: "UPDATE",
      };
      console.log("body:", body);
      if (body.classExamid && body.term !== "") {
        this.$openDialog("U", this.$t("updateDataSuccess"));
        await this.storeExam.CRUDEXAM(body);
        this.$emit("updateExam", "updated");
        console.log("body");
        setTimeout(() => {
          this.$closeDialog();
        }, 800);
      }
    },
    async OnSelect() {
      console.log("subjectbinding", this.subjectbinding);
      this.classbinding = this.subjectbinding.ClassExam;
    },
  },
  computed: {
    storeExam() {
      return useExamStore();
    },
    getTime() {
      return useGetDate().getTime;
    },
  },
};
</script>


<style lang="scss" scoped></style>
