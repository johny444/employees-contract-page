<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("studentList") }}</h1>
      </v-col>
      <v-col style="text-align: end">
        <div class="d-inline-flex">
          <ExamStudentAddSTDbyFile @addstudent="receiveCUD" />
          <div class="mx-2"></div>
          <ExamStudentAddStudent @addstudent="receiveCUD" />
        </div>
      </v-col>
    </v-row>
    <div class="mt-5">
      <v-table>
        <thead>
          <tr>
            <th>{{ $t("rowNum") }}</th>
            <th>{{ $t("studentName") }}</th>
            <th>{{ $t("createDate") }}</th>
            <th>{{ $t("studentCode") }}</th>
            <th>{{ $t("password") }}</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(item, i) in tableData" :key="item.name">
              <td width="5%" class="pa-0">
                <v-checkbox-btn
                  color="red"
                  :value="item.id"
                  v-model="selected"
                  :label="(i + 1).toString()"
                ></v-checkbox-btn>
              </td>
              <td width="20%" :class="{ done: allChecked }">
                <template v-if="item.gender === '0'">
                  <v-avatar
                    image="https://th.bing.com/th/id/OIP.6-C1zVUDGDeY-GqQJiuCfAHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    size="25"
                  ></v-avatar
                ></template>
                <template v-else>
                  <v-avatar
                    image="https://th.bing.com/th/id/OIP.IB0XUg8PV5FGxOf0WWDdOQHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    size="25"
                  ></v-avatar>
                </template>
                {{ item.name }}
              </td>
              <td width="10%">
                {{ item.time }}
              </td>
              <td width="10%">{{ item.studentCode }}</td>
              <td width="20%">{{ item.password }}</td>
              <td width="10%">
                <v-row justify="center" style="margin: 1rem">
                  <ExamStudentDetail
                    :items="item"
                    :examid="currentRoute.params.student"
                    @updatestd="receiveCUD"
                  />
                  <v-spacer></v-spacer>
                  <ExamStudentDelStudent
                    :item="item.id"
                    @Delstudent="receiveCUD"
                  />
                </v-row>
              </td>
            </tr>
          </template>
          <template v-else>
            <td :colspan="9">
              <div style="margin-top: 1rem; text-align: center">
                <NoData></NoData>
              </div>
            </td>
          </template>
        </tbody>
        <template #bottom v-if="tableData.length > 0">
          <v-row class="pa-3">
            <v-col class="pa-0">
              <v-checkbox-btn
                color="red"
                v-model="allChecked"
                class="d-inline-flex"
                :label="$t('selectAll') + `\t` + selected.length.toString()"
              ></v-checkbox-btn>

              <ExamStudentDelMultiSTD
                class="mb-9 ml-1"
                :item="selected"
                @Delstudent="receiveCUD"
              />
            </v-col>
            <v-col class="pa-0">
              <table-pagination
                :itemList="newArray.length"
                :perPage="perPage"
                @valueChange="onPageChange"
              ></table-pagination>
            </v-col>
          </v-row>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import { useStudentStore } from "@/stores/student";
export default {
  setup() {
    // const nuxtApp = useNuxtApp();
    const store = useStudentStore();
    const tableData = ref([]);
    const selected = ref([]);
    const allChecked = ref(false);
    const perPage = ref(10);
    const router = useRouter();
    const currentRoute = router.currentRoute;
    console.log("currentRoute.path", currentRoute.value.params.student);
    const newArray = ref([]);
    const ClassExam = async () => {
      nuxtApp.$openLoading();
      await store.StudentFILER(currentRoute.value.params.student);
      nuxtApp.$closeLoading();
      console.log("store:", store.studentfilter);
      newArray.value = store.studentfilter;
      console.log("newArray", newArray.value.length);
      tableData.value = [];
      for (var i = 0; i < perPage.value; i++) {
        if (i < newArray.value.length) {
          tableData.value.push(newArray.value[i]);
        }
      }
    };
    onMounted(async () => {
      ClassExam();
    });
    const receiveCUD = async (v) => {
      console.log("CRUD", v);
      ClassExam();
      selected.value = [];
      allChecked.value = false;
    };
    const onTableSearch = () => {
      var newArray = [];
      if (searchText.value != "") {
        try {
          var lowSearch = searchText.value.toLowerCase();
          newArray = store.getstudentList.filter((wine) =>
            Object.values(wine).some((val) =>
              String(val).toLowerCase().includes(lowSearch)
            )
          );
        } catch {}
      } else {
        newArray = store.getstudentList;
      }
      tableData.value = [];
      for (var i = 0; i < perPage.value; i++) {
        if (i < newArray.length) {
          tableData.value.push(newArray[i]);
        }
      }
    };
    const onPageChange = (v) => {
      var a = v.currenPage * v.perPage - v.perPage;
      tableData.value = [];
      try {
        for (var i = a; i < a + v.perPage; i++) {
          if (i < newArray.value.length) {
            tableData.value.push(newArray.value[i]);
          }
        }
      } catch (e) {
        i = a + v.perPage;
      }
    };
    watch(allChecked, (currentValue, oldValue) => {
      if (currentValue) {
        tableData.value.map((v) => {
          if (selected.value.indexOf(v.id) === -1) {
            selected.value.push(v.id);
          }
        });
      } else {
        selected.value = [];
      }
      console.log("length ", selected.value.length);
    });

    return {
      tableData,
      store,
      perPage,
      newArray,
      currentRoute,
      selected,
      allChecked,
      onPageChange,
      receiveCUD,
    };
  },
  data: () => ({
    items: Array.from({ length: 50 }, (k, v) => v + 1),
  }),
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
  background-color: rgb(241, 102, 102);
}
</style>
