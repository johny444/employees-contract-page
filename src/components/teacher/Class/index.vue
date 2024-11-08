<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("classExam") }}</h1>
      </v-col>
      <v-col style="text-align: end">
        <ClassAddClass
          @addclass="receiveCUD"
          :userInfo="storeUser.getuserList.user"
        />
      </v-col>
    </v-row>
    <div class="mt-5">
      <v-table>
        <thead>
          <tr>
            <th>{{ $t("rowNum") }}</th>
            <th>{{ $t("subject") }}</th>
            <th>{{ $t("createDate") }}</th>
            <th>{{ $t("class") }}</th>
            <th>{{ $t("status") }}</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(item, i) in tableData" :key="item.name" align="center">
              <td width="5%">{{ i + 1 }}</td>
              <td width="10%">{{ item.subjectExam }}</td>
              <td width="20%">{{ item.time }}</td>
              <td width="10%">{{ item.classExam }}</td>
              <td width="10%">
                <v-btn
                  variant="tonal"
                  rounded="xl"
                  @click="clickStatus(item)"
                  :color="item.status === 'A' ? 'primary' : 'red'"
                >
                  <template v-if="item.status === `A`">
                    {{ $t("activate") }}
                  </template>
                  <template v-else>
                    {{ $t("disable") }}
                  </template>
                </v-btn>
              </td>
              <td width="5%">
                <v-row justify="center" style="margin: 1rem">
                  <ClassUpdateClass :data="item" @updateclass="receiveCUD" />
                  <v-spacer></v-spacer>
                  <ClassDelClass :item="item.id" @Delclass="receiveCUD" />
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
          <table-pagination
            :itemList="store.getclassExamList.length"
            :perPage="perPage"
            @valueChange="onPageChange"
          ></table-pagination>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import { useClassStore } from "@/stores/class";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores/loadingStore";
export default {
  setup() {
    // const { getTime } = useGetDate();
    // const nuxtApp = useNuxtApp();
    const loadingStore = useLoadingStore();
    const store = useClassStore();
    const storeUser = useUserStore();
    const tableData = ref([]);
    const perPage = ref(10);
    const Status = ref("");
    const token = ref("");
    const ClassExam = async () => {
      try {
        token.value = localStorage.getItem("token");
        // loadingStore.openLoading();
        console.log("storeUser", storeUser.getuserList);
        await storeUser.acGetuserList(token.value);
        await store.CRUDCLASSEXAM({
          ACTION: "GETBYTEACHERID",
          teacherID: storeUser.getuserList.user[0].id,
        });
        // loadingStore.closeLoading();
        console.log("Class: ", store.getclassExamList.DATA);

        let newArray = store.getclassExamList.DATA.filter((v) => {
          return v.teacherID === storeUser.getuserList.user[0].id;
        });
        tableData.value = [];
        for (var i = 0; i < perPage.value; i++) {
          if (i < newArray.length) {
            tableData.value.push(newArray[i]);
          }
        }
        // console.log("store class", store.getclassExamList);
      } catch (error) {
        console.log("cath error:", error);
        // nuxtApp.$openDialog("E", error);
      }
    };
    onMounted(() => {
      ClassExam();
    });
    const receiveCUD = async (v) => {
      console.log("Added", v);
      ClassExam();
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
          if (i < store.getclassExamList.length) {
            tableData.value.push(store.getclassExamList[i]);
          }
        }
      } catch (e) {
        i = a + v.perPage;
      }
    };

    const clickStatus = async (data) => {
      if (data.status === "A") {
        let body = {
          id: data.id,
          subjectExam: data.subjectExam,
          classExam: data.classExam,
          status: "D",
          time: getTime(),
          teacherID: storeUser.getuserList.user[0].id,
          ACTION: "UPDATE",
        };
        await store.CRUDCLASSEXAM(body);
      } else {
        let body = {
          id: data.id,
          subjectExam: data.subjectExam,
          classExam: data.classExam,
          status: "A",
          time: getTime(),
          teacherID: storeUser.getuserList.user[0].id,
          ACTION: "UPDATE",
        };
        await store.CRUDCLASSEXAM(body);
      }
      ClassExam();
    };

    return {
      tableData,
      store,
      perPage,
      Status,
      clickStatus,
      onPageChange,
      receiveCUD,
      storeUser,
    };
  },
};
</script>

<style scoped></style>
