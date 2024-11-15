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
              <td width="10%" align="center">
                <router-link :to="`/result/${item.id}`">
                  <v-btn
                    variant="text"
                    density="compact"
                    icon="fa-solid fa-plus"
                    size="medium"
                    :ripple="false"
                  >
                    <v-icon
                      style="color: #046b5a"
                      icon="fa-solid fa-sheet-plastic"
                    />
                    <v-tooltip activator="parent" location="start">{{
                      $t("detail")
                    }}</v-tooltip>
                  </v-btn>
                </router-link>
              </td>
            </tr>
          </template>
          <template v-else-f="!loading && tableData.length === 0">
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
export default {
  data() {
    return {
      tableData: [],
      perPage: 10,
      loading: true, // Add loading state
      loadingStore: useLoadingStore(),
      store: useExamStore(),
      storeUser: useUserStore(),
      storeclass: useClassStore(),
    };
  },
  mounted() {
    this.loadingStore.openLoading();
    this.ClassExam();
    this.getExam();
    this.loadingStore.closeLoading();
  },
  computed: {
    isLoading() {
      return this.loadingStore.isLoading;
    },
  },
  methods: {
    async ClassExam() {
      try {
        this.loadingStore.openLoading();

        await this.store.CRUDEXAM({ ACTION: "GETAll" });
        await this.storeUser.acGetuserList(localStorage.getItem("token"));
        this.loadingStore.closeLoading();

        // Filter classExam
        this.storeclass.CLASSEXAMFILER(
          this.storeclass.getclassExamList.DATA,
          this.storeUser.getuserList.user[0].id
        );

        // Filter and add classExamid to exams
        const matching = this.InsertObjectClassExam(
          this.store.examList.DATA,
          this.storeclass.examclassfilter
        );

        matching.forEach((item) => {
          item.classExamid = this.storeclass.examclassfilter.find(
            (exam) => exam.id === item.classExamid
          );
        });

        // Update table data
        const newArray = matching;
        console.log("newArray", newArray);
        this.tableData = [];
        for (let i = 0; i < this.perPage; i++) {
          if (i < newArray.length) {
            this.tableData.push(newArray[i]);
          }
        }
        console.log("this.tableData", this.tableData);
      } catch (error) {
        console.log("catch error:", error);
      } finally {
        this.loading = false; // End loading
        this.loadingStore.closeLoading();
      }
    },

    async getExam() {
      const storeclass = useClassStore();
      await storeclass.CRUDCLASSEXAM({ ACTION: "GETAll" });
    },

    InsertObjectClassExam(Exams, classExam) {
      return Exams.filter((exam) => {
        return classExam.some((classItem) => classItem.id === exam.classExamid);
      });
    },

    async receiveCUD(v) {
      console.log("Added", v);
      this.ClassExam();
    },

    onTableSearch() {
      let newArray = [];
      if (this.searchText !== "") {
        try {
          const lowSearch = this.searchText.toLowerCase();
          newArray = this.store.getstudentList.filter((wine) =>
            Object.values(wine).some((val) =>
              String(val).toLowerCase().includes(lowSearch)
            )
          );
        } catch (e) {
          console.error(e);
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
      const a = v.currenPage * v.perPage - v.perPage;
      this.tableData = [];
      try {
        for (let i = a; i < a + v.perPage; i++) {
          if (i < this.store.getExamList.length) {
            this.tableData.push(this.store.getExamList[i]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

