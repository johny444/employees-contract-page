<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("classExam") }}</h1></v-col
      >
      <v-spacer></v-spacer>
      <v-col style="text-align: end">
        <ExamAddExam
          @addExam="receiveCUD"
          :data="{
            classExam: storeclass.examclassfilter,
            user: storeUser.getuserList.user,
          }"
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
            <th>{{ $t("term") }}</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(item, i) in tableData" :key="item.name">
              <td width="5%" align="center">{{ i + 1 }}</td>
              <td width="10%">{{ item.classExamid.subjectExam }}</td>
              <td width="20%">{{ item.time }}</td>
              <td width="10%">{{ item.classExamid.classExam }}</td>
              <td width="10%">
                {{ item.term === "mid" ? $t("midterm") : $t("finalterm") }}
              </td>
              <td width="12%">
                <v-row justify="center" style="margin: 1rem">
                  <ExamUpdateExam
                    :data="item"
                    :classlist="storeclass.examclassfilter"
                    @updateExam="receiveCUD"
                  />
                  <v-spacer></v-spacer>
                  <NuxtLink :to="`/exam/${item.id}`">
                    <v-btn
                      variant="text"
                      density="compact"
                      icon="fa-solid fa-plus"
                      size="medium"
                    >
                      <v-icon style="color: #046b5a" icon="fa-regular fa-eye" />
                      <v-tooltip activator="parent" location="start">{{
                        $t("detail")
                      }}</v-tooltip>
                    </v-btn>
                  </NuxtLink>
                  <v-spacer></v-spacer>
                  <ExamQuestion :examID="item.id" />

                  <v-spacer></v-spacer>
                  <ExamDelExam :item="item.id" @DelExam="receiveCUD" />
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
            :itemList="store.examList.length"
            :perPage="perPage"
            @valueChange="onPageChange"
          ></table-pagination>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import { useExamStore } from "@/stores/exam";
import { useClassStore } from "@/stores/class";
import { useUserStore } from "@/stores/user";
import { useResultStore } from "@/stores/result";
import { useLoadingStore } from "@/stores/loadingStore";
export default {
  setup() {
    // const nuxtApp = useNuxtApp();
    const store = useExamStore();
    const storeclass = useClassStore();
    const storeUser = useUserStore();
    const storeResult = useResultStore();
    const loadingStore = useLoadingStore();
    const tableData = ref([]);
    const perPage = ref(10);

    const ClassExam = async () => {
      // loadingStore.openLoading();
      console.log("Loading has mmount");
      await store.CRUDEXAM({ ACTION: "GETAll" });
      //Filter classExam
      await storeUser.acGetuserList(localStorage.getItem("token"));
      await storeclass.CRUDCLASSEXAM({
        ACTION: "GETBYTEACHERID",
        teacherID: storeUser.getuserList.user[0].id,
      });
      storeclass.CLASSEXAMFILER(
        storeclass.getclassExamList.DATA,
        storeUser.getuserList.user[0].id
      );
      // loadingStore.closeLoading();
      // console.log("examfilter", storeclass.examclassfilter);
      //add object to classExamid
      const matching = InsertClassExamInfoToExam(
        store.examList.DATA,
        storeclass.examclassfilter
      );
      // console.log("matching:", matching);
      matching.forEach((item) => {
        item.classExamid = storeclass.examclassfilter.find(
          (exam) => exam.id === item.classExamid
        );
      });
      let newArray = matching;
      storeResult.GetExamlistRS(newArray);
      tableData.value = [];
      for (var i = 0; i < perPage.value; i++) {
        if (i < newArray.length) {
          tableData.value.push(newArray[i]);
        }
      }
      // console.log("ExamlistRS:", storeResult.ExamlistRS);
    };
    // const getExam = async () => {
    //   await storeclass.CRUDCLASSEXAM({ ACTION: "GETAll" });
    // };
    onMounted(async () => {
      // getExam();
      ClassExam();
      console.log("Exam component");
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
          if (i < store.getexamList.length) {
            tableData.value.push(store.getexamList[i]);
          }
        }
      } catch (e) {
        i = a + v.perPage;
      }
    };
    return {
      tableData,
      store,
      storeclass,
      storeUser,
      perPage,
      onPageChange,
      receiveCUD,
    };
  },
};
</script>

<style scoped></style>
