<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("exam") }}</h1>
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
                  <!-- <NuxtLink :to="`/quiz/${item.id}`"> -->
                  <v-btn
                    variant="text"
                    density="compact"
                    icon="fa-solid fa-plus"
                    size="medium"
                    @click="startExam(item.id)"
                  >
                    <v-icon
                      style="color: #046b5a"
                      icon="fa-solid fa-file-circle-question"
                    />
                    <v-tooltip activator="parent" location="start">{{
                      $t("startExam")
                    }}</v-tooltip>
                  </v-btn>
                  <!-- </NuxtLink> -->
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
export default {
  data() {
    return {
      tableData: [],
      perPage: 10,
      searchText: "",
      store: useExamStore(),
      storeSTD: useStudentStore(),
      storeUser: useUserStore(),
      storeclass: useClassStore(),
    };
  },

  methods: {
    async ClassExam() {
      // Open loading
      this.nuxtApp.$openLoading();

      // Fetch data
      await this.store.CRUDEXAM({ ACTION: "GETAll" });
      await this.storeclass.CRUDCLASSEXAM({ ACTION: "GETAll" });
      await this.storeSTD.CRUDStudent({
        id: this.storeUser.getuserList.user[0].id,
        ACTION: "GETID",
      });

      // Close loading
      this.nuxtApp.$closeLoading();

      // Filter and transform data
      const examTest = this.store.examList.DATA.filter((v) => {
        return v.id === this.storeSTD.getstudentList.DATA[0].ExamId;
      });

      examTest.forEach((item) => {
        item.classExamid = this.storeclass.getclassExamList.DATA.find(
          (exam) => exam.id === item.classExamid
        );
      });

      // Populate tableData
      const newArray = examTest;
      this.tableData = [];
      for (let i = 0; i < this.perPage; i++) {
        if (i < newArray.length) {
          this.tableData.push(newArray[i]);
        }
      }
    },
    async receiveCUD(v) {
      console.log("Added", v);
      await this.ClassExam();
    },
    onTableSearch() {
      let newArray = [];
      if (this.searchText !== "") {
        try {
          const lowSearch = this.searchText.toLowerCase();
          newArray = this.store.getstudentList.filter((item) =>
            Object.values(item).some((val) =>
              String(val).toLowerCase().includes(lowSearch)
            )
          );
        } catch (error) {
          console.error(error);
        }
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
      const start = v.currenPage * v.perPage - v.perPage;
      this.tableData = [];
      try {
        for (let i = start; i < start + v.perPage; i++) {
          if (i < this.store.getexamList.length) {
            this.tableData.push(this.store.getexamList[i]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    startExam(examID) {
      navigateTo(`/quiz/${examID}`);
    },
  },
  mounted() {
    this.ClassExam();
  },
};
</script>

<style scoped></style>
