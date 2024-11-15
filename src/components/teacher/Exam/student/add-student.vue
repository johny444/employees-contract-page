<template>
  <div>
    <v-dialog v-model="dialog" width="700">
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
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title align="center" class="bg-light-blue-darken-4">
            <h2>{{ $t("addnewStudent") }}</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col style="text-align: center">
                  <template v-if="Gender === '0'">
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
                  <v-radio-group
                    inline
                    v-model="Gender"
                    @change="onChange"
                    direction
                  >
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
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="fullname"
                    :rules="[rules.required]"
                    :label="$t('studentName')"
                    cl3ass="my-2"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="studentCode"
                    :rules="[rules.required]"
                    :label="$t('studentCode')"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    v-model="generateEmail"
                    :rules="[rules.required]"
                    :label="$t('email')"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    :rules="[rules.required]"
                    :label="$t('birthday')"
                    density="compact"
                    variant="outlined"
                    v-model="birthday"
                    type="date"
                  ></v-text-field>
                  <v-text-field
                    :rules="[rules.required]"
                    :label="$t('password')"
                    density="compact"
                    variant="outlined"
                    v-model="password"
                    clearable
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
              @click="
                fullname && studentCode && birthday && password !== ``
                  ? (dialog = false)
                  : (dialog = true)
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
  </div>
</template>

<script>
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useStudentStore } from "@/stores/student";
export default {
  props: [""],
  emit: ["addstudent"],
  data() {
    return {
      AlertStore: useAlertStore(),
      d: "1995-10-01",
      fullname: "",
      email: "",
      Gender: "male",
      birthday: null,
      password: "",
      studentCode: "",
      dialog: false,
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
      this.fullname = "";
      this.email = "";
      this.Gender = "male";
      this.birthday = this.d;
      this.password = "";
      this.studentCode = "";
    },
    async onSubmit() {
      // console.log("this.$route.pat", this.$route.params.student);
      if (this.fullname && this.password && this.studentCode) {
        const body = {
          ExamId: this.$route.params.student,
          id: uuid(),
          role: "student",
          name: this.fullname,
          email: this.email,
          gender: this.Gender,
          password: this.password,
          studentCode: this.studentCode,
          birthday: moment(this.birthday).format("DD-MM-YYYY"),
          time: this.getTime(),
          ACTION: "INSERT",
        };
        console.log("body", body);
        if (body) {
          this.AlertStore.openDialog("S", this.$t("insertDataSuccess"));
          const store = useStudentStore();
          await store.CRUDStudent(body);
          this.$emit("addstudent", "added");
          setTimeout(() => {
            this.AlertStore.closeDialog();
          }, 800);
        }
      }
    },
    onChange() {
      console.log("Gender", this.Gender);
    },
    Generate() {
      this.password = this.generatePassword();
    },
  },
  computed: {
    generateEmail() {
      if (this.fullname) {
        this.email = this.fullname + "@gmail.com";
        return this.fullname + "@gmail.com";
      }
    },
  },
};
</script>

