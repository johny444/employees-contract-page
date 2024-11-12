<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ props }">
      <v-btn
        class="bg-teal-darken-2"
        rounded="lg"
        v-bind="props"
        @click="Onopen"
      >
        <v-icon class="mr-1"> fa-solid fa-plus </v-icon>
        {{ $t("addNew") }}
        <v-tooltip activator="parent" location="start">
          {{ $t("addNew") }}</v-tooltip
        >
      </v-btn>
    </template>
    <v-card rounded="lg">
      <v-form @submit.prevent="onSubmit">
        <v-card-title align="center" class="bg-teal-darken-2">
          <h2>{{ $t("addnewExam") }}</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-combobox
              :rules="[rules.required]"
              v-model="classExambinding"
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
            @click="
              classExambinding !== `` ? (dialog = false) : (dialog = true)
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
</template>

<script>
import { v4 as uuid } from "uuid";
import { useExamStore } from "@/stores/exam";

export default {
  props: ["data"],
  emit: ["addclass"],
  data() {
    return {
      storeExam: useExamStore(),
      dialog: false,
      exambinding: "", // Refactored from ref() to data
      classExambinding: "", // Refactored from ref() to data
      classbinding: "", // Refactored from ref() to data
      termbinding: "mid", // Default value
      temp: null, // Refactored from ref() to data
      rules: {
        required: (value) => !!value || this.$t("requiredInsert"),
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || this.$t("InvalidEmail");
        },
      },
    };
  },
  methods: {
    async Onopen() {
      console.log("props user", this.data.user);
      this.exambinding = "";
      this.classExambinding = "";
      this.classbinding = "";
      this.termbinding = "mid";
      this.temp = this.data.classExam;
    },
    async onSubmit() {
      console.log("classExambinding", JSON.stringify(this.classExambinding));

      let body = {
        id: uuid(),
        classExamid: this.classExambinding.id,
        term: this.termbinding,
        time: this.getTime(),
        ACTION: "INSERT",
      };

      console.log("body:", body);

      if (body.classExamid && body.term !== "") {
        let response = await this.storeExam.CRUDEXAM(body);
        console.log("response", response.message);

        if (response.code === "ERR_BAD_REQUEST") {
          this.$nuxt.$openDialog("E", response.message);
        } else {
          this.$nuxt.$openDialog("S", this.$t("insertDataSuccess"));
          this.$emit("addExam", "added");
          console.log("body");
          setTimeout(() => {
            this.$nuxt.$closeDialog();
          }, 800);
        }
      }
    },
    async OnSelect() {
      console.log("classExambinding", this.classExambinding);
      this.classbinding = this.classExambinding.ClassExam;
    },
  },
};
</script>

<style lang="scss" scoped></style>
