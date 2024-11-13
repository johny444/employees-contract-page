<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("classExam") }}</h1>
      </v-col>
      <v-col style="text-align: end">
        <add-class
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
          <template v-if="!loading && tableData.length > 0">
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
                  <update-class :data="item" @updateclass="receiveCUD" />
                  <v-spacer></v-spacer>
                  <del-class :item="item.id" @Delclass="receiveCUD" />
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
export default {
  data() {
    return {
      tableData: [], // Replaces ref([])
      perPage: 10, // Replaces ref(10)
      Status: "", // Replaces ref("")
      token: "", // Replaces ref("")
      loading: true, // Add loading state
      store: useClassStore(),
      storeUser: useUserStore(),
      loadingStore: useLoadingStore(),
    };
  },

  mounted() {
    this.ClassExam(); // Equivalent to onMounted
  },
  methods: {
    async ClassExam() {
      try {
        // this.loading = true; // Start loading
        this.loadingStore.openLoading();
        this.token = localStorage.getItem("token");

        // loadingStore.openLoading();
        console.log("storeUser", this.storeUser.getuserList);
        await this.storeUser.acGetuserList(this.token);

        await this.store.CRUDCLASSEXAM({
          ACTION: "GETBYTEACHERID",
          teacherID: this.storeUser.getuserList.user[0].id,
        });

        // loadingStore.closeLoading();
        console.log("Class: ", this.store.classExamList.DATA);

        let newArray = this.store.classExamList.DATA.filter((v) => {
          return v.teacherID === this.storeUser.getuserList.user[0].id;
        });
        this.tableData = [];
        for (let i = 0; i < this.perPage; i++) {
          if (i < newArray.length) {
            this.tableData.push(newArray[i]);
          }
        }
      } catch (error) {
        console.log("catch error:", error);
        // nuxtApp.$openDialog("E", error);
      } finally {
        this.loading = false; // End loading
        this.loadingStore.closeLoading();
      }
    },
    async receiveCUD(v) {
      console.log("Added", v);
      this.ClassExam();
    },
    onTableSearch() {
      let newArray = [];
      if (this.searchText !== "") {
        try {
          let lowSearch = this.searchText.toLowerCase();
          newArray = this.store.getstudentList.filter((wine) =>
            Object.values(wine).some((val) =>
              String(val).toLowerCase().includes(lowSearch)
            )
          );
        } catch (error) {}
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
      let a = v.currenPage * v.perPage - v.perPage;
      this.tableData = [];
      try {
        for (let i = a; i < a + v.perPage; i++) {
          if (i < this.store.getclassExamList.length) {
            this.tableData.push(this.store.getclassExamList[i]);
          }
        }
      } catch (e) {
        i = a + v.perPage;
      }
    },
    async clickStatus(data) {
      let body = {
        id: data.id,
        subjectExam: data.subjectExam,
        classExam: data.classExam,
        status: data.status === "A" ? "D" : "A",
        time: this.getTime(),
        teacherID: this.storeUser.getuserList.user[0].id,
        ACTION: "UPDATE",
      };
      await this.store.CRUDCLASSEXAM(body);
      this.ClassExam();
    },
  },
};
</script>

<style scoped></style>
