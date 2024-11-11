<template>
  <div>
    <v-dialog v-model="dialog" width="300">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          :ripple="false"
          density="compact"
          icon="fa-solid fa-plus"
          size="medium"
          v-bind="props"
          @click="onOpen"
        >
          <v-icon
            style="color: rgb(16, 98, 212)"
            icon="fa-regular fa-pen-to-square"
          ></v-icon>
          <v-tooltip activator="parent" location="start">{{
            $t("edit")
          }}</v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title align="center" class="bg-light-blue-darken-4">
            <h2>{{ $t("updateclassExam") }}</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                :label="$t('subject')"
                :rules="WarningTxT.s"
                class="my-2"
                density="compact"
                variant="outlined"
                v-model="subjectbinding"
              ></v-text-field>
              <v-text-field
                :rules="WarningTxT.c"
                :label="$t('class')"
                class="my-2"
                density="compact"
                variant="outlined"
                v-model="classbinding"
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-divider :thickness="2"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="tonal"
              type="submit"
              @click="dialog = false"
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
  </div>
</template>
<script>
import { useClassStore } from "@/stores/class";
export default {
  props: ["data"],
  emit: ["updateclass"],
  setup(props, { emit }) {
    const store = useClassStore();
    // const nuxtApp = useNuxtApp();
    const dialog = ref(false);
    const subjectbinding = ref("");
    const classbinding = ref("");
    const WarningTxT = ref({
      s: [
        (v) => {
          if (v) {
            return true;
          }
          return nuxtApp.$t("pleaseEntersubject");
        },
      ],
      c: [
        (v) => {
          if (v) {
            return true;
          }
          return nuxtApp.$t("pleaseEnterclass");
        },
      ],
    });
    const onOpen = () => {
      console.log("user", props.data);
      subjectbinding.value = props.data.subjectExam;
      classbinding.value = props.data.classExam;
    };

    const onSubmit = async () => {
      console.log("getTime()", getTime());
      // let body = {
      //   id: props.data.id,
      //   subjectExam: subjectbinding.value,
      //   classExam: classbinding.value,
      //   status: props.data.status,
      //   time: getTime(),
      //   teacherID: props.data.teacherID,
      //   ACTION: "UPDATE",
      // };
      // console.log("body", body);
      // // ------------------------------------
      // nuxtApp.$openLoading();
      // var result = await store.CRUDCLASSEXAM(body);
      // if (result.status == "200") {
      //   console.log("result", result);
      //   nuxtApp
      //     .$openAlert("S", nuxtApp.$t("updateDataSuccess"))
      //     .then(async (r) => {
      //       nuxtApp.$closeLoading();
      //       emit("updateclass", "updated");
      //     });
      // } else {
      //   nuxtApp.$closeLoading();
      //   nuxtApp.$openAlert("E", result.status);
      // }
    };
    return {
      WarningTxT,
      dialog,
      props,
      subjectbinding,
      classbinding,
      onSubmit,
      onOpen,
    };
  },
};
</script>

<style lang="scss" scoped></style>
