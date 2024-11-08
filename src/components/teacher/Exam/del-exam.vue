<template>
  <v-btn
    @click="onDel()"
    variant="text"
    density="compact"
    icon="fa-solid fa-plus"
    size="medium"
    :ripple="false"
  >
    <v-icon style="color: red" icon="fa-regular fa-trash-can" />
    <v-tooltip activator="parent" location="top">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>

<script>
import { useExamStore } from "@/stores/exam";
export default {
  props: ["item"],
  emit: ["Delclass"],
  setup(props, { emit }) {
    const store = useExamStore();
    // const nuxtApp = useNuxtApp();
    const onDel = async () => {
      nuxtApp
        .$openAlert("Q", nuxtApp.$t("areYouSureToDelete"))
        .then(async (res) => {
          nuxtApp.$openLoading();
          var result = await store.CRUDEXAM({
            id: props.item,
            ACTION: "DELETE",
          });
          console.log("result.status", result.status);
          if (result.status == "200") {
            console.log("Emit");
            nuxtApp
              .$openAlert("S", nuxtApp.$t("deleteDataSuccess"))
              .then(async (r) => {
                emit("DelExam", "Deled");
                console.log("Delclass success");
                nuxtApp.$closeLoading();
              });
          } else {
            nuxtApp.$closeLoading();
            nuxtApp.$openAlert("E", result.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    const receiveDel = () => {};
    return { onDel, receiveDel, props };
  },
};
</script>

<style lang="scss" scoped></style>
