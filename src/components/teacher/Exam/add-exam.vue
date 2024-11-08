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
  setup(props, { emit }) {
    const { getTime } = useGetDate();
    // const nuxtApp = useNuxtApp();
    const storeExam = useExamStore();
    const dialog = ref(false);
    const exambinding = ref("");
    const classExambinding = ref("");
    const classbinding = ref("");
    const termbinding = ref("mid");
    const temp = ref();
    const rules = ref({
      required: (value) => !!value || nuxtApp.$t("requiredInsert"),
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || nuxtApp.$t("InvalidEmail");
      },
    });
    const Onopen = async () => {
      console.log("props user", props.data.user);
      exambinding.value = "";
      classExambinding.value = "";
      classbinding.value = "";
      termbinding.value = "mid";
      temp.value = props.data.classExam;
    };
    const onSubmit = async () => {
      console.log("classExambinding", JSON.stringify(classExambinding.value));
      let body = {
        id: uuid(),
        classExamid: classExambinding.value.id,
        term: termbinding.value,
        time: getTime(),
        ACTION: "INSERT",
      };
      console.log("body:", body);
      if (body.classExamid && body.term !== "") {
        var respone = await storeExam.CRUDEXAM(body);
        console.log("respone", respone.message);
        if (respone.code === "ERR_BAD_REQUEST") {
          nuxtApp.$openDialog("E", respone.message);
        } else {
          nuxtApp.$openDialog("S", nuxtApp.$t("insertDataSuccess"));
          emit("addExam", "added");
          console.log("body");
          setTimeout(() => {
            nuxtApp.$closeDialog();
          }, 800);
        }
      }
    };
    const OnSelect = async () => {
      console.log("classExambinding", classExambinding.value);
      classbinding.value = classExambinding.value.ClassExam;
    };
    return {
      temp,
      props,
      termbinding,
      dialog,
      classExambinding,
      classbinding,
      exambinding,
      rules,
      Onopen,
      onSubmit,
      OnSelect,
    };
  },
};
</script>

<style lang="scss" scoped></style>
