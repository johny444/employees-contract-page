<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          density="compact"
          icon="fa-solid fa-plus"
          size="medium"
          v-bind="props"
          @click="onOpen"
        >
          <v-icon
            style="color: rgb(7, 96, 56)"
            icon="fa-solid fa-address-card"
          ></v-icon>
          <v-tooltip activator="parent" location="start">{{
            $t("detail")
          }}</v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title align="center" class="bg-light-blue-darken-4">
            <h2>{{ $t("detail") }}</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <div align="center">
                    <template v-if="gender === '0'">
                      <v-avatar
                        image="https://th.bing.com/th/id/OIP.6-C1zVUDGDeY-GqQJiuCfAHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        size="200"
                      ></v-avatar
                    ></template>
                    <template v-else>
                      <v-avatar
                        image="https://th.bing.com/th/id/OIP.IB0XUg8PV5FGxOf0WWDdOQHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        size="200"
                      ></v-avatar>
                    </template>
                    <v-row style="width: 10rem; height: 5rem">
                      <v-radio-group inline v-model="gender" class="mt-3">
                        <v-radio
                          color="primary"
                          :label="$t('male')"
                          value="0"
                        ></v-radio>
                        <v-radio
                          color="primary"
                          :label="$t('female')"
                          value="1"
                        ></v-radio>
                      </v-radio-group>
                    </v-row>
                  </div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="studentName"
                    :label="$t('studentName')"
                    class="my-2"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="studentCode"
                    :label="$t('studentCode')"
                    class="my-2"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="generateEmail"
                    :label="$t('email')"
                    class="my-2"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                  {{ birthday }}
                  <v-text-field
                    :value="birthday"
                    :label="$t('birthday')"
                    class="my-2"
                    density="compact"
                    variant="outlined"
                    type="date"
                    v-model="birthday"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :label="$t('password')"
                    class="my-2"
                    density="compact"
                    variant="outlined"
                  >
                    <template v-slot:append-inner>
                      <v-fade-transition leave-absolute>
                        <v-tooltip location="bottom">
                          <template v-slot:activator="{ props }">
                            <v-icon
                              v-bind="props"
                              icon="fa-solid fa-g"
                              @click="Generate"
                            ></v-icon>
                          </template>
                          {{ $t("random") }}
                        </v-tooltip>
                      </v-fade-transition>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
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
import moment from "moment";
import { useStudentStore } from "@/stores/student";

export default {
  props: ["items", "examid"],
  emit: ["updatestd"],
  data() {
    return {
      dialog: false,
      password: "",
      Dateformat: "",
      studentName: "",
      studentCode: "",
      email: "",
      gender: "",
      birthday: "",
      model: true,
      store: useStudentStore(), // Initialize store
      loadingStore: useLoadingStore(),
      AlertStore: useAlertStore(),
    };
  },
  computed: {
    generateEmail() {
      if (this.studentName) {
        this.email = this.studentName + "@gmail.com";
        return this.studentName + "@gmail.com";
      }
    },
  },
  methods: {
    dateFormat(str) {
      let parts = str.split("-");
      let formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      return formattedDate;
    },
    onOpen() {
      console.log("object", this.items);
      this.birthday = this.dateFormat(this.items.birthday);
      this.password = this.items.password;
      this.studentName = this.items.name;
      this.studentCode = this.items.studentCode;
      this.email = this.items.email;
      this.gender = this.items.gender;
    },
    Generate() {
      this.password = $generatePassword();
    },
    async onSubmit() {
      let body = {
        id: this.items.id,
        role: "student",
        name: this.studentName,
        email: this.email,
        gender: this.gender,
        password: this.password,
        studentCode: this.studentCode,
        birthday: moment(this.birthday).format("DD-MM-YYYY"),
        time: this.getTime(),
        ExamId: this.examid,
        ACTION: "UPDATE",
      };

      console.log("Body", body);
      this.loadingStore.openLoading();
      var result = await this.store.CRUDStudent(body);
      console.log("result", result);

      if (result.status == "200") {
        console.log("result", result);
        this.AlertStore.openDialog("S", this.$t("updateDataSuccess"));
        this.loadingStore.closeLoading();
        setTimeout(() => {
          this.AlertStore.closeDialog();
        }, 800);

        this.$emit("updatestd", "updated");
      } else {
        this.loadingStore.closeLoading();
        this.AlertStore.closeDialog("E", result.status);
      }
    },
  },
  mounted() {
    this.onOpen();
  },
};
</script>
