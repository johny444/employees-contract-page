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
        <v-tooltip activator="parent" location="end">
          {{ $t("addNew") }}</v-tooltip
        >
      </v-btn>
    </template>
    <v-card rounded="lg">
      <v-form @submit.prevent="onSubmit">
        <v-card-title align="center" class="bg-teal-darken-2">
          <h2>{{ $t("addnewclassExam") }}</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              :label="$t('subject')"
              :rules="[rules.required]"
              class="my-2"
              density="compact"
              variant="outlined"
              v-model="subjectbinding"
            ></v-text-field>
            <v-text-field
              :label="$t('class')"
              :rules="[rules.required]"
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
            @click="classbinding !== `` ? (dialog = false) : (dialog = true)"
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
// import { useClassStore } from "@/stores/class"; // Import your Pinia store
import { v4 as uuid } from "uuid";
// import { useAlertStore } from "@/stores/alertStore";
export default {
  props: ["userInfo"],
  emits: ["addclass"],
  data() {
    return {
      AlertStore: useAlertStore(),
      dialog: false,
      subjectbinding: "",
      classbinding: "",
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
    Onopen() {
      this.subjectbinding = "";
      this.classbinding = "";
    },
    async onSubmit() {
      const store = useClassStore(); // Access your Pinia store here
      let body = {
        id: uuid(),
        subjectExam: this.subjectbinding,
        status: "A",
        classExam: this.classbinding,
        time: this.getTime(),
        teacherID: this.userInfo[0].id,
        ACTION: "INSERT",
      };
      if (body.subjectExam && body.classExam !== "") {
        this.AlertStore.openDialog("S", this.$t("insertDataSuccess"));
        await store.CRUDCLASSEXAM(body); // Use the store's method
        this.$emit("addclass", "added");
        console.log("body");
        setTimeout(() => {
          this.AlertStore.closeDialog();
        }, 800);
      }
    },
  },
  mounted() {
    // Any initialization logic you need can go here
  },
};
</script>


<style lang="scss" scoped></style>
