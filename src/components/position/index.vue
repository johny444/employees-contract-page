<template>
  <v-container max-width="90%">
    <v-form @submit.prevent="onSubmit">
      <div class="action">
        <v-row align="start">
          <v-col class="left">
            <v-row justify="space-between" no-gutters>
              <v-col cols="4" class="d-flex">
                <v-text-field
                  density="comfortable"
                  :label="$t('search')"
                  prepend-inner-icon="fa-solid fa-magnifying-glass"
                  variant="outlined"
                  v-model="search"
                ></v-text-field>
                <h3 class="pa-2">{{ $t("total") }}:{{ total }}</h3>
              </v-col>
              <v-col align="end">
                <template v-if="tableData.length > 0">
                  <div class="d-flex flex-row-reverse">
                    <Export-excel :dataExport="tableData" />
                    <div class="mx-2"></div>
                    <ListType
                      :defalutTitle="typeList"
                      :items="itemList"
                      @update-type="TypeListChange"
                      class="mx-3"
                    />
                  </div>
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
            <td width="2%">{{ item.EMPID }}</td>
            <td width="15%">{{ item.POSITIONTYPENAME }}</td>
            <td width="6%" align="center">
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
    <div>
      <v-row justify="space-between" no-gutters>
        <v-col>
          <ItemPage
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
import ItemPage from "../Item-page.vue";
import ListType from "../ListType.vue";
export default {
  components: { ItemPage, ListType },
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
      typeList: "leader",
      itemList: [{ title: "leader" }, { title: "all" }],
      header: [
        "rowNum",
        "FULLNAME",
        "EMPID",
        "POSITION",
        "STARTDATE",
        "ENDDATE",
        "DEPARTMENT",
        "branch",
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
    async getList(typelist) {
      let body = {
        positionType: typelist.toUpperCase(),
        ACTION: "GET_POSITION",
      };
      console.log("body: ", body);
      await this.store.GET_HRData(body);
      // await this.store.GET_EMPLOYEEPOSITION({ type: typelist });
      this.tableData = this.store.employee.DATA;
      this.total = this.store.employee.LENGTH;
    },
    onSubmit() {},
    TypeListChange(v) {
      console.log("v", v);
      this.typeList = v;
      this.getList(v);
    },
    perPageChange(v) {
      console.log("v", v);
      this.perPage = v;
    },
  },
  async mounted() {
    this.loadingStore.openLoading();
    this.getList(this.typeList);
    this.loadingStore.closeLoading();
  },
};
</script>
  
  <style scoped>
</style>
  