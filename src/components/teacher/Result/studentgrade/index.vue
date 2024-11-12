<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("gradeExam") }}</h1>
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
            <th>{{ $t("grade") }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(item, i) in tableData" :key="item.name">
              <td width="5%" class="pa-0" align="center">
                {{ i + 1 }}
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
              <td width="8%" align="center">{{ item.mark }}</td>
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
import { useResultStore } from "@/stores/result";
import { useLoadingStore } from "@/stores/loadingStore";
export default {
  setup() {
    const loadingStore = useLoadingStore();
    const store = useStudentStore();
    const storeRS = useResultStore();
    const tableData = ref([]);
    const selected = ref([]);
    const allChecked = ref(false);
    const perPage = ref(10);
    const router = useRouter();
    const currentRoute = router.currentRoute;
    const newArray = ref([]);

    const ClassExam = async () => {
      loadingStore.openLoading();
      await store.StudentFILER(currentRoute.value.params.grade);
      loadingStore.closeLoading();
      console.log("store:", store.studentfilter);
      await storeRS.CRUDRESULT({ ACTION: "GETAll" });
      newArray.value = store.studentfilter;
      console.log("newArray.value", newArray.value);
      tableData.value = [];
      for (var i = 0; i < perPage.value; i++) {
        if (i < newArray.value.length) {
          tableData.value.push(newArray.value[i]);
        }
      }
      // console.log("storeRS.getresultList", storeRS.getresultList.DATA);

      storeRS.getresultList.DATA.map((v) => {
        tableData.value.map((d) => {
          if (d.id === v.studentid) {
            console.log("true");
            d.mark = v.marks;
          }
        });
      });
    };
    onMounted(async () => {
      ClassExam();
    });
    const receiveCUD = async (v) => {
      console.log("Added", v);
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
