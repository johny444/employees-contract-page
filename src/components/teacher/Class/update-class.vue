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
  data() {
    return {
      store: useClassStore(),
      dialog: false, // Replaces ref(false)
      subjectbinding: "", // Replaces ref("")
      classbinding: "", // Replaces ref("")
      WarningTxT: {
        s: [
          (v) => {
            if (v) {
              return true;
            }
            return this.$t("pleaseEntersubject");
          },
        ],
        c: [
          (v) => {
            if (v) {
              return true;
            }
            return this.$t("pleaseEnterclass");
          },
        ],
      },
    };
  },
  methods: {
    onOpen() {
      console.log("user", this.data);
      this.subjectbinding = this.data.subjectExam;
      this.classbinding = this.data.classExam;
    },
    async onSubmit() {
      console.log("getTime()", this.getTime());

      // let body = {
      //   id: this.data.id, // Accessing props.data
      //   subjectExam: this.subjectbinding, // Accessing local variable
      //   classExam: this.classbinding, // Accessing local variable
      //   status: this.data.status, // Accessing props.data
      //   time: this.getTime(), // Calling the method
      //   teacherID: this.data.teacherID, // Accessing props.data
      //   ACTION: "UPDATE",
      // };

      // console.log("body", body);

      // // Loading indicator start
      // this.$nuxt.$openLoading();

      // // Making the request
      // var result = await this.store.CRUDCLASSEXAM(body);

      // // Handling the response
      // if (result.status == "200") {
      //   console.log("result", result);

      //   this.$nuxt.$openAlert("S", this.$t("updateDataSuccess")).then(() => {
      //     this.$nuxt.$closeLoading();
      //     this.$emit("updateclass", "updated");
      //   });
      // } else {
      //   this.$nuxt.$closeLoading();
      //   this.$nuxt.$openAlert("E", result.status);
      // }
    },
  },
};
</script>


<style lang="scss" scoped></style>
