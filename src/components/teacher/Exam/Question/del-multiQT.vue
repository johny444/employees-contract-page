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
    <v-tooltip activator="parent" location="end">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>
<script>
import { useQuestionStore } from "@/stores/question";
export default {
  props: ["item"],
  emit: ["DelQT"],
  setup(props, { emit }) {
    const store = useQuestionStore();
    // const nuxtApp = useNuxtApp();
    const onDel = () => {
      console.log("Del", props.item);
      nuxtApp
        .$openAlert("Q", nuxtApp.$t("areYouSureToDelete"))
        .then(async (res) => {
          nuxtApp.$openLoading();
          var rs = "";
          for (let index = 0; index < props.item.length; index++) {
            rs = await store.CRUDQUESTION({
              id: props.item[index],
              ACTION: "DELETE",
            });
          }
          console.log("rs", rs);
          if (rs.status == "200") {
            nuxtApp
              .$openAlert("S", nuxtApp.$t("deleteDataSuccess"))
              .then(async (r) => {
                console.log("Emit");
                emit("DelQT", "Deled");
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
