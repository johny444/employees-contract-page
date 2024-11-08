<template>
  <div>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ props }">
        <v-btn
          class="bg-blue-darken-3"
          rounded="lg"
          v-bind="props"
          @click="Onopen"
        >
          <v-icon class="mr-1"> fa-regular fa-file-excel </v-icon>
          {{ $t("addbyexcel") }}
          <v-tooltip activator="parent" location="start">
            {{ $t("addbyexcel") }}</v-tooltip
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
              <div
                elevation="12"
                border="lg opacity-12"
                width="100%"
                class="pa-4 text-center mx-auto"
                style="border-style: dashed"
              >
                <v-icon
                  class="mb-5"
                  color="blue-darken-2"
                  icon="fa-solid fa-download"
                  size="50"
                  @click="filecheck"
                ></v-icon>
                <div>
                  <input
                    type="file"
                    id="excelFile"
                    @change="excelExport"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style="display: none"
                  />
                </div>
                <div class="d-inline-flex">
                  <h2 class="mb-6">{{ $t("selectfile") }}.</h2>
                  <ExamStudentStdExport />
                </div>
              </div>
              <div v-if="excelData.length > 0">
                <v-card-title
                  style="text-align: center"
                  class="text-decoration-underline"
                >
                  {{ $t("item") }}
                </v-card-title>
                <v-row>
                  <v-col class="px-0" style="text-align: center">{{
                    $t("studentName")
                  }}</v-col>
                  <v-col class="px-0" style="text-align: center">{{
                    $t("studentCode")
                  }}</v-col>
                  <v-col class="px-0" style="text-align: center">{{
                    $t("email")
                  }}</v-col>
                  <v-col class="px-0" style="text-align: center">{{
                    $t("gender")
                  }}</v-col>
                  <v-col class="px-0" style="text-align: center">{{
                    $t("birhday")
                  }}</v-col>
                </v-row>
                <v-divider></v-divider>
                <v-virtual-scroll
                  :items="excelData"
                  height="320"
                  item-height="48"
                >
                  <template v-slot:default="{ item }">
                    <v-row style="text-align: center">
                      <v-col>
                        <v-list-item :title="`${item.name}`" class="px-0">
                        </v-list-item
                      ></v-col>
                      <v-col class="px-0">
                        <v-list-item :title="`${item.studentCode}`">
                        </v-list-item
                      ></v-col>
                      <v-col class="px-0">
                        <v-list-item :title="`${item.email}`" class="px-0">
                        </v-list-item
                      ></v-col>
                      <v-col class="px-0">
                        <v-list-item
                          :title="
                            item.gender === '0' ? $t('male') : $t('female')
                          "
                        >
                        </v-list-item
                      ></v-col>
                      <v-col class="px-0">
                        <v-list-item
                          :title="`${moment(item.birthday).format(
                            `YYYY-MM-DD`
                          )}`"
                        >
                        </v-list-item
                      ></v-col>
                    </v-row>
                  </template>
                </v-virtual-scroll>
              </div>
            </v-container>
          </v-card-text>
          <v-divider :thickness="2"></v-divider>
          <v-card-actions>
            <v-btn
              @click="clearfile"
              variant="text"
              density="compact"
              icon="fa-brands fa-x-twitter"
              size="medium"
            >
              <v-icon style="color: red" icon="fa-brands fa-x-twitter" />
              <v-tooltip activator="parent" location="end">
                {{ $t("deletedatafile") }}
              </v-tooltip>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="tonal"
              type="submit"
              @click="
                name && studentCode && birthday && password !== ``
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
import * as XLSX from "xlsx";
export default {
  props: [""],
  emit: ["addstudent"],
  setup(props, { emit }) {
    const excelData = ref([]);
    const d = ref("1995-10-01");
    const store = useStudentStore();
    const router = useRouter();
    const currentRoute = router.currentRoute;
    const { getTime } = useGetDate();
    const { generatePassword } = useGeneratepassword();
    // const nuxtApp = useNuxtApp();
    const dialog = ref(false);
    const name = ref("");
    const email = ref("");
    const Gender = ref("male");
    const birthday = ref();
    const password = ref("");
    const studentCode = ref("");
    const Onopen = () => {};
    const onSubmit = async () => {
      excelData.value.map((v) => {
        v.password = generatePassword();
        v.time = getTime();
        v.ExamId = currentRoute.value.params.student;
        v.id = uuid();
        v.role = "student";
        v.ACTION = "INSERT";
      });
      if (excelData.value) {
        var rs = "";
        for (let index = 0; index < excelData.value.length; index++) {
          console.log("excelData.value[index]", excelData.value[index]);
          rs = await store.CRUDStudent(excelData.value[index]);
        }
        console.log("rs", rs);
        if (rs) {
          nuxtApp.$openLoading();
          setTimeout(() => {
            console.log("submit");
            // nuxtApp.$closeDialog();
            emit("addstudent", "added");
            dialog.value = false;
            nuxtApp.$closeLoading();
          }, 800);
        }
      }
    };
    const onChange = () => {
      console.log("Gender", Gender.value);
    };

    const generateEmail = computed(() => {
      if (name.value) {
        email.value = name.value + "@gmail.com";
        return name.value + "@gmail.com";
      }
    });
    const Generate = () => {
      password.value = generatePassword();
    };
    const filecheck = () => {
      document.getElementById("excelFile").click();
    };
    const excelExport = (event) => {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          excelData.value = rowObj;
        });
      };

      reader.readAsBinaryString(input.files[0]);
    };
    watch(dialog, (currentValue, oldValue) => {
      if (currentValue === false) {
        excelData.value = [];
      } else {
        excelData.value = [];
      }
    });
    const clearfile = () => {
      excelData.value = [];
    };
    return {
      clearfile,
      excelData,
      filecheck,
      excelExport,
      moment,
      email,
      d,
      name,
      password,
      dialog,
      Gender,
      birthday,
      generateEmail,
      studentCode,
      onSubmit,
      Onopen,
      onChange,
      Generate,
    };
  },
};
</script>
