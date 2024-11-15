<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ $t("studentList") }}</h1>
      </v-col>
      <v-col style="text-align: end">
        <div class="d-inline-flex">
          <addSTDby-file @addstudent="receiveCUD" />
          <div class="mx-2"></div>
          <add-student @addstudent="receiveCUD" />
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
                  <detail
                    :items="item"
                    :examid="$route.params.student"
                    @updatestd="receiveCUD"
                  />
                  <v-spacer></v-spacer>
                  <del-student :item="item.id" @Delstudent="receiveCUD" />
                </v-row>
              </td>
            </tr>
          </template>
          <template v-else>
            <td :colspan="9">
              <div style="margin-top: 1rem; text-align: center">
                <no-data></no-data>
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

              <del-multiSTD
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
  data() {
    return {
      loadingStore: useLoadingStore(),
      tableData: [],
      selected: [],
      allChecked: false,
      perPage: 10,
      newArray: [],
      items: Array.from({ length: 50 }, (k, v) => v + 1),
      store: useStudentStore(),
    };
  },
  computed: {
    currentRoute() {
      return this.$router.currentRoute;
    },
  },
  methods: {
    async ClassExam() {
      this.loadingStore.openLoading();
      await this.store.StudentFILER(this.$route.params.student);
      this.loadingStore.closeLoading();
      this.newArray = this.store.studentfilter;
      this.tableData = [];
      for (let i = 0; i < this.perPage; i++) {
        if (i < this.newArray.length) {
          this.tableData.push(this.newArray[i]);
        }
      }
    },
    async receiveCUD(v) {
      console.log("CRUD", v);
      await this.ClassExam();
      this.selected = [];
      this.allChecked = false;
    },
    onTableSearch() {
      let newArray = [];
      if (this.searchText !== "") {
        try {
          let lowSearch = this.searchText.toLowerCase();
          newArray = this.store.getstudentList.filter((student) =>
            Object.values(student).some((val) =>
              String(val).toLowerCase().includes(lowSearch)
            )
          );
        } catch (e) {
          console.log("Error during search", e);
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
      const start = v.currentPage * v.perPage - v.perPage;
      this.tableData = [];
      try {
        for (let i = start; i < start + v.perPage; i++) {
          if (i < this.newArray.length) {
            this.tableData.push(this.newArray[i]);
          }
        }
      } catch (e) {
        console.log("Pagination error", e);
      }
    },
  },
  watch: {
    allChecked(currentValue, oldValue) {
      if (currentValue) {
        this.tableData.forEach((v) => {
          if (!this.selected.includes(v.id)) {
            this.selected.push(v.id);
          }
        });
      } else {
        this.selected = [];
      }
      console.log("length ", this.selected.length);
    },
  },
  mounted() {
    this.ClassExam();
  },
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
  background-color: rgb(241, 102, 102);
}
</style>
