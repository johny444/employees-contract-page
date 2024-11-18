<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("classExam") }}</h1></v-col
      >
      <v-spacer></v-spacer>
      <v-col style="text-align: end">
        <add-exam
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
          <template v-if="!loading && tableData.length > 0">
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
                  <update-exam
                    :data="item"
                    :classlist="storeclass.examclassfilter"
                    @updateExam="receiveCUD"
                  />
                  <v-spacer></v-spacer>
                  <router-link :to="`/exam/${item.id}`">
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
                  </router-link>
                  <v-spacer></v-spacer>
                  <ExamQuestion :examID="item.id" />

                  <v-spacer></v-spacer>
                  <del-exam :item="item.id" @DelExam="receiveCUD" />
                </v-row>
              </td>
            </tr>
          </template>
          <template v-else-if="!loading && tableData.length === 0">
            <td :colspan="9">
              <div style="margin-top: 1rem; text-align: center">
                <no-data></no-data>
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
import ExamQuestion from "@/components/teacher/Exam/Question/index.vue";
export default {
  components: {
    ExamQuestion,
  },
  data() {
    return {
      tableData: [],
      perPage: 10,
      searchText: "",
      loading: true, // Add loading state
      loadingStore: useLoadingStore(),
      store: useExamStore(),
      storeclass: useClassStore(),
      storeUser: useUserStore(),
      storeResult: useResultStore(),
    };
  },

  methods: {
    async ClassExam() {
      try {
        // this.loading = true; // Start loading
        this.loadingStore.openLoading();
        await this.store.CRUDEXAM({ ACTION: "GETAll" });
        await this.storeUser.acGetuserList(localStorage.getItem("token"));
        await this.storeclass.CRUDCLASSEXAM({
          ACTION: "GETBYTEACHERID",
          teacherID: this.storeUser.getuserList.user[0].id,
        });
        this.storeclass.CLASSEXAMFILER(
          this.storeclass.getclassExamList.DATA,
          this.storeUser.getuserList.user[0].id
        );

        const matching = this.InsertClassExamInfoToExam(
          this.store.examList.DATA,
          this.storeclass.examclassfilter
        );
        matching.forEach((item) => {
          item.classExamid = this.storeclass.examclassfilter.find(
            (exam) => exam.id === item.classExamid
          );
        });

        let newArray = matching;
        // this.storeResult.GetExamlistRS(newArray);

        this.tableData = [];
        for (let i = 0; i < this.perPage; i++) {
          if (i < newArray.length) {
            this.tableData.push(newArray[i]);
          }
        }
      } catch (error) {
        console.log("catch error:", error);
      } finally {
        this.loading = false; // End loading
        this.loadingStore.closeLoading();
      }
    },
    receiveCUD(v) {
      console.log("Added", v);
      this.ClassExam();
    },
    onTableSearch() {
      let newArray = [];
      if (this.searchText !== "") {
        const lowSearch = this.searchText.toLowerCase();
        newArray = this.store.getstudentList.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(lowSearch)
          )
        );
      } else {
        newArray = this.store.getstudentList;
      }

      this.tableData = [];
      for (let i = 0; i < this.perPage; i++) {
        if (i < newArray.length) {
          this.tableData.push(newArray[i]);
        }
      }
    },
    onPageChange(v) {
      const a = v.currenPage * v.perPage - v.perPage;
      this.tableData = [];
      try {
        for (let i = a; i < a + v.perPage; i++) {
          if (i < this.store.getexamList.length) {
            this.tableData.push(this.store.getexamList[i]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.ClassExam();
  },
};
</script>

<style scoped></style>
