<template>
  <v-container max-width="90%">
    <v-form @submit.prevent="onSubmit">
      <div class="action">
        <v-row align="start">
          <v-col class="left">
            <v-row justify="space-between" no-gutters>
              <v-col cols="3" class="d-flex">
                <v-text-field
                  clearable
                  density="comfortable"
                  label="Search"
                  prepend-inner-icon="fa-solid fa-magnifying-glass"
                  variant="outlined"
                  v-model="search"
                ></v-text-field>
                <h3 class="pa-2">{{ $t("total") }}:{{ total }}</h3></v-col
              >
              <v-col align="end">
                <template v-if="tableData.length > 0">
                  <export :dataExport="tableData" />
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <v-table>
      <thead>
        <tr>
          <th>{{ $t("rowNum") }}</th>
          <th>{{ $t("FULLNAME") }}</th>
          <th>{{ $t("EMPID") }}</th>
          <th>{{ $t("POSITION") }}</th>
          <th>{{ $t("STARTDATE") }}</th>
          <th>{{ $t("TODATE") }}</th>
          <th>{{ $t("DEPARTMENT") }}</th>
          <th>{{ $t("branch") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedData.length > 0">
          <tr v-for="(item, i) in paginatedData" :key="item.name">
            <td width="2%" align="center">
              {{ (currentPage - 1) * perPage + i + 1 }}
            </td>
            <td width="15%" align="center">{{ item.EMPNAME }}</td>
            <td width="5%">{{ item.EMPID }}</td>
            <td width="15%">{{ item.POSITIONTYPENAME }}</td>
            <td width="5%" align="center">
              {{ formatDateShow(item.FROMDATE) }}
            </td>
            <td width="5%" align="center">
              {{ item.TODATE ? formatDateShow(item.TODATE) : "-" }}
            </td>
            <td width="15%">{{ item.DEPARTMENT }}</td>
            <td width="17%">{{ item.BRANCH }}</td>
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
    </v-table>
    <!-- Pagination Controls -->
    <div class="text-center">
      <v-container class="py-0">
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                rounded="circle"
              ></v-pagination>
              <span class="ml-2"
                >Page {{ currentPage }} of {{ totalPages }}</span
              >
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
  
  <script>
import moment from "moment";
export default {
  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      TODate: moment().format("YYYY-MM-DD"),
      tableData: [], // Complete data from the API
      perPage: 10, // Number of rows per page
      currentPage: 1, // Current page
      loading: true,
      store: useHRStore(),
      loadingStore: useLoadingStore(),
      search: "",
      total: 0,
      tab: null,
    };
  },

  computed: {
    filteredData() {
      const searchTerm = this.search.trim().toLowerCase();
      return this.tableData.filter((item) =>
        item.EMPNAME.toLowerCase().includes(searchTerm)
      );
    },
    totalPages() {
      return Math.ceil(this.tableData.length / this.perPage); // Calculate total pages
    },
    paginatedData() {
      // Slice the tableData for the current page
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredData.slice(start, end);
    },
    filterItem() {
      return this.paginatedData.filter((item) => {
        return (
          item.EMPNAME.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    async getList(period) {
      await this.store.GET_EMPLOYEEPOSITION({ type: "leader" });
      this.tableData = this.store.employee.DATA;
      console.log("this.tableData ", this.tableData);
      this.total = this.store.employee.AllRECORD;
    },
    onSubmit() {
      console.log("start", this.formatDate(this.startDate));
      console.log("start", this.formatDate(this.TODate));

      let period = {
        start: this.formatDate(this.startDate),
        end: this.formatDate(this.TODate),
      };

      // console.log("date:", period);
      this.getList(period);
    },
  },
  async mounted() {
    this.loadingStore.openLoading();
    this.getList(this.startDate, this.TODate);
    this.loadingStore.closeLoading();
  },
};
</script>
  
  <style scoped>
.main-container {
  background-color: rgb(242, 243, 247);
  max-height: 100vh;
  min-height: 100vh;
  overflow-x: hidden;
}

.label {
  margin-bottom: 1rem;
}
</style>
  