<template>
  <v-container max-width="90%">
    <v-form @submit.prevent="onSubmit">
      <div class="action">
        <p class="font-italic">Note: Date Format for filter is MM/DD/YYYY</p>
        <v-row align="center">
          <h3 class="label pl-4">{{ $t("from").toUpperCase() }}</h3>
          <v-col cols="2">
            <v-text-field
              v-model="startDate"
              density="compact"
              variant="outlined"
              type="date"
            ></v-text-field>
          </v-col>
          <h3 class="label">{{ $t("to").toUpperCase() }}</h3>
          <v-col cols="2">
            <v-text-field
              v-model="endDate"
              density="compact"
              variant="outlined"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-row>
              <v-col>
                <v-btn color="teal-darken-3" class="mb-6" type="submit"
                  >Apply</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col class="left">
            <v-row justify="space-between" no-gutters>
              <v-col cols="9" class="d-flex">
                <v-text-field
                  density="comfortable"
                  :label="$t('search')"
                  prepend-inner-icon="fa-solid fa-magnifying-glass"
                  variant="outlined"
                  v-model="search"
                ></v-text-field>
                <h3 class="pa-2">{{ $t("total") }}:{{ total }}</h3></v-col
              >

              <v-col align="end">
                <template v-if="tableData.length > 0">
                  <Export-excel :dataExport="tableData" />
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <v-table>
      <table-header :data-header="header" />
      <tbody>
        <template v-if="paginatedData.length > 0">
          <tr v-for="(item, i) in paginatedData" :key="item.name">
            <td width="2%" align="center">
              {{ (currentPage - 1) * perPage + i + 1 }}
            </td>
            <td width="15%">{{ item.EMPNAME }}</td>
            <td width="5%" align="center">{{ item.CONTRACTNO }}</td>
            <td width="5%" align="center">{{ item.DURATION }}</td>
            <td width="5%" align="center">
              {{ formatDateShow(item.STARTDATE) }}
            </td>
            <td width="5%" align="center">
              {{ item.ENDDATE ? formatDateShow(item.ENDDATE) : "-" }}
            </td>
            <td width="10%">{{ item.POSITION }}</td>
            <td width="20%">{{ item.DEP }}</td>
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
    <div>
      <v-row justify="space-between" no-gutters>
        <v-col>
          <item-page
            :pageProp="perPage"
            @update-pageProp="perPageChange"
            class="pa-5"
          />
        </v-col>
        <v-col cols="4">
          <v-container class="max-width text-center">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              rounded="circle"
            ></v-pagination>
            <span class="ml-2">Page {{ currentPage }} of {{ totalPages }}</span>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      tableData: [], // Complete data from the API
      perPage: 10, // Number of rows per page
      currentPage: 1, // Current page
      loading: true,
      store: useHRStore(),
      loadingStore: useLoadingStore(),
      search: "",
      total: 0,
      tab: null,
      header: [
        "rowNum",
        "FULLNAME",
        "CONTRACTNO",
        "DURATION",
        "STARTDATE",
        "ENDDATE",
        "POSITION",
        "DEPARTMENT",
      ],
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
    async getList(startDate, endDate) {
      let body = {
        start: this.formatDate(startDate),
        end: this.formatDate(endDate),
        ACTION: "GET_CONTRACT",
      };
      console.log("body: ", body);
      await this.store.GET_HRData(body);
      this.tableData = this.store.employee.DATA;
      // console.log("object", this.store.employee);
      this.total = this.store.employee.LENGTH;
    },
    onSubmit() {
      console.log("start", this.formatDate(this.startDate));
      console.log("start", this.formatDate(this.endDate));

      let period = {
        start: this.formatDate(this.startDate),
        end: this.formatDate(this.endDate),
      };

      // console.log("date:", period);
      this.getList(period.start, period.end);
    },
    perPageChange(v) {
      console.log("v", v);
      this.perPage = v;
    },
  },
  async mounted() {
    console.log("Date:", this.startDate);
    this.loadingStore.openLoading();
    this.getList(this.startDate, this.endDate);
    this.loadingStore.closeLoading();
  },
};
</script>

<style scoped>
</style>
