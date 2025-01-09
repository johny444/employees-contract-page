<template>
  <div class="main-container pa-2">
    <div class="header pa-4">
      <v-row>
        <v-col align="start">
          <h1>Employees Contract list</h1>
        </v-col>
        <v-col align="end"> <LangSwitcher /> </v-col>
      </v-row>
    </div>
    <v-container max-width="90%">
      <v-form @submit.prevent="onSubmit">
        <div class="action">
          <v-row align="center">
            <h3 class="label px-5">FROM</h3>
            <v-col cols="2">
              <v-text-field
                v-model="startDate"
                density="compact"
                variant="outlined"
                type="date"
              ></v-text-field>
            </v-col>
            <h3 class="label">TO</h3>
            <v-col cols="2">
              <v-text-field
                v-model="endDate"
                density="compact"
                variant="outlined"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-row>
                <v-col>
                  <v-btn class="mb-6" type="submit">Apply</v-btn>
                </v-col>
                <v-col align="end" justify="center">
                  <h3>{{ $t("total") }}:{{ total }}</h3></v-col
                >
              </v-row>
            </v-col>
            <v-col>
              <v-text-field
                clearable
                density="comfortable"
                label="Search"
                prepend-inner-icon="fa-solid fa-magnifying-glass"
                variant="outlined"
                v-model="search"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-form>
      <v-table>
        <thead>
          <tr>
            <th>{{ $t("rowNum") }}</th>
            <th>{{ $t("FULLNAME") }}</th>
            <th>{{ $t("CONTRACTNO") }}</th>
            <th>{{ $t("DURATION") }}</th>
            <th>{{ $t("STARTDATE") }}</th>
            <th>{{ $t("ENDDATE") }}</th>
            <th>{{ $t("POSITION") }}</th>
            <th>{{ $t("DEPARTMENT") }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="paginatedData.length > 0">
            <tr v-for="(item, i) in paginatedData" :key="item.name">
              <td width="2%" align="center">
                {{ (currentPage - 1) * perPage + i + 1 }}
              </td>
              <td width="15%">{{ item.EMPNAME }}</td>
              <td width="5%">{{ item.CONTRACTNO }}</td>
              <td width="5%">{{ item.DURATION }}</td>
              <td width="5%">{{ formatDateShow(item.STARTDATE) }}</td>
              <td width="5%">
                {{ item.ENDDATE ? formatDateShow(item.ENDDATE) : item.ENDDATE }}
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
      <!-- <v-row justify="center" class="mt-4">
        <v-btn small outlined @click="prevPage" :disabled="currentPage === 1"
          >Previous</v-btn
        >
        <v-btn
          small
          outlined
          @click="nextPage"
          :disabled="currentPage === totalPages"
          >Next</v-btn
        >
        <span class="ml-2">Page {{ currentPage }} of {{ totalPages }}</span>
      </v-row> -->
    </v-container>
  </div>
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
      await this.store.GET_EMPLOYEELSIT(period);
      this.tableData = this.store.employee.DATA;
      this.total = this.store.employee.AllRECORD;
    },
    onSubmit() {
      console.log("start", this.formatDate(this.startDate));
      console.log("start", this.formatDate(this.endDate));

      let period = {
        start: this.formatDate(this.startDate),
        end: this.formatDate(this.endDate),
      };

      // console.log("date:", period);
      this.getList(period);
    },
  },
  async mounted() {
    this.loadingStore.openLoading();
    this.getList(this.startDate, this.endDate);
    this.loadingStore.closeLoading();
  },
};
</script>

<style scoped>
.main-container {
  /* background-color: rgb(153, 195, 233); */
  max-height: 100vh;
  min-height: 100vh;
  overflow-x: hidden;
}

.label {
  margin-bottom: 1rem;
}
</style>
