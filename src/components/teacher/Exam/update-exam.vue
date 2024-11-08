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
  props: ["data", "classlist"],
  emit: ["updateExam"],
  setup(props, { emit }) {
    const { getTime } = useGetDate();
    // const nuxtApp = useNuxtApp();
    const storeExam = useExamStore();
    const dialog = ref(false);
    const subjectbinding = ref("");
    const classbinding = ref("");
    const termbinding = ref("mid");
    const temp = ref();
    const rules = ref({
      required: (value) => !!value || nuxtApp.$t("requiredInsert"),
    });
    const onOpen = async () => {
      console.log("props", props.data);
      subjectbinding.value = props.data.classExamid;
      classbinding.value = props.data.classExamid.classExam;
      termbinding.value = props.data.term;
      temp.value = props.classlist;
      console.log("temp", temp.value);
    };
    const onSubmit = async () => {
      console.log("subjectbing", subjectbinding.value);
      let body = {
        id: props.data.id,
        classExamid: subjectbinding.value.id,
        term: termbinding.value,
        time: getTime(),
        ACTION: "UPDATE",
      };
      console.log("body:", body);
      if (body.classExamid && body.term !== "") {
        nuxtApp.$openDialog("U", nuxtApp.$t("updateDataSuccess"));
        await storeExam.CRUDEXAM(body);
        emit("updateExam", "updated");
        console.log("body");
        setTimeout(() => {
          nuxtApp.$closeDialog();
        }, 800);
      }
    };
    const OnSelect = async () => {
      console.log("subjectbinding", subjectbinding.value);
      classbinding.value = subjectbinding.value.ClassExam;
    };
    return {
      temp,
      classbinding,
      props,
      termbinding,
      dialog,
      subjectbinding,
      rules,
      onOpen,
      onSubmit,
      OnSelect,
    };
  },
};
</script>

<style lang="scss" scoped></style>
