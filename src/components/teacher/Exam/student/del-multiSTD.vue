<template>
  <v-btn
    @click="onDel()"
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
import { useStudentStore } from "@/stores/student";
export default {
  props: ["item"],
  emit: ["Delstudent"],
  setup(props, { emit }) {
    const store = useStudentStore();
    // const nuxtApp = useNuxtApp();
    const onDel = () => {
      console.log("Del", props.item);
      nuxtApp
        .$openAlert("Q", nuxtApp.$t("areYouSureToDelete"))
        .then(async (res) => {
          nuxtApp.$openLoading();

          var rs = "";
          for (let index = 0; index < props.item.length; index++) {
            console.log("props.item[index]:", props.item[index]);
            rs = await store.CRUDStudent({
              id: props.item[index],
              ACTION: "DELETE",
            });
          }
          // var result = await store.acDelstudent(props.item);
          console.log("rs", rs);
          if (rs.status == "200") {
            nuxtApp
              .$openAlert("S", nuxtApp.$t("deleteDataSuccess"))
              .then(async (r) => {
                console.log("Emit");
                emit("Delstudent", "Deled");
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
