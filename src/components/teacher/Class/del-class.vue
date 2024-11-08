<template>
  <v-btn
    @click="onDel()"
    :ripple="false"
    variant="text"
    density="compact"
    icon="fa-solid fa-plus"
    size="medium"
  >
    <v-icon style="color: red" icon="fa-regular fa-trash-can" />
    <v-tooltip activator="parent" location="start">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>

<script>
import { useClassStore } from "@/stores/class";
export default {
  props: ["item"],
  emit: ["Delclass"],
  setup(props, { emit }) {
    const store = useClassStore();
    // const nuxtApp = useNuxtApp();
    const onDel = async () => {
      nuxtApp
        .$openAlert("Q", nuxtApp.$t("areYouSureToDelete"))
        .then(async (res) => {
          nuxtApp.$openLoading();
          let result = await store.CRUDCLASSEXAM({
            id: props.item,
            ACTION: "DELETE",
          });
          if (result.status == "200") {
            console.log("Emit");
            nuxtApp
              .$openAlert("S", nuxtApp.$t("deleteDataSuccess"))
              .then(async (r) => {
                emit("Delclass", "Deled");
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
      // nuxtApp.$openAlert("Q", nuxtApp.$t("areYouSureToDelete"));
      // nuxtApp.$openLoading();
      // var result = await store.acDelclassExam(props.item);
      // if (result.status == "200") {
      //   nuxtApp.$openAlert("S", nuxtApp.$t("deleteDataSuccess"));
      //   emit("Delclass", "Deled");
      //   console.log("Delclass success");
      //   nuxtApp.$closeLoading();
      // } else {
      //   nuxtApp.$closeLoading();
      //   nuxtApp.$openAlert("E", result.message);
      // }
    };
    const receiveDel = () => {};
    return { onDel, receiveDel, props };
  },
};
</script>

<style lang="scss" scoped></style>
