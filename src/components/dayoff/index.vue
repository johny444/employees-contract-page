<template>
  <v-container max-width="100%">
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
              <v-col>
                <div class="d-flex flex-row-reverse">
                  <Export-excel :dataExport="tableData" />
                  <div class="mx-1"></div>
                  <ListType
                    :defalutTitle="unitDefault"
                    :items="unit"
                    @update-type="unitUpdate"
                    class="mx-3"
                  />
                  <div class="mx-1"></div>
                  <ListType
                    :defalutTitle="branchDefault"
                    :items="branch"
                    @update-type="branchUpdate"
                    class="mx-3"
                  />
                  <div class="mx-1"></div>
                  <ListType
                    :defalutTitle="year"
                    :items="yearList"
                    @update-type="yearUpdate"
                    class="mx-3"
                  />
                  <div class="mx-1"></div>
                  <v-btn color="teal-darken-3" class="mb-6" @click="onSubmit()"
                    >Apply</v-btn
                  >
                </div>
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
          <th>{{ $t("STARTDATE") }}</th>
          <th>{{ $t("ENDDATE") }}</th>
          <th>{{ $t("DAYOFFAMOUNT") }}</th>
          <th>{{ $t("PARTOFDAY") }}</th>
          <th>{{ $t("DESC") }}</th>
          <th>{{ $t("status") }}</th>
          <!-- <th>{{ $t("MAKER") }}</th> -->
          <th>{{ $t("AUTHID") }}</th>
          <th>{{ $t("HR_AUTHID") }}</th>
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
            <td width="10%">{{ formatDateShow(item.START_DATE) }}</td>
            <td width="10%">{{ formatDateShow(item.END_DATE) }}</td>
            <td width="6%" align="center">
              {{ item.LEAVE_AMOUNT }}
            </td>
            <td width="5%" align="center">
              {{ item.PART_OF_DAY }}
            </td>
            <td width="10%">{{ item.DES }}</td>
            <td width="13%">{{ item.STATUS }}</td>
            <!-- <td width="3%">{{ item.MAKER }}</td> -->
            <td width="3%">{{ item.AUTH_ID ? item.AUTH_ID : "-" }}</td>
            <td width="6%">{{ item.HR_AUTH_ID }}</td>
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
      year: new Date().getFullYear(),
      yearList: this.getYear(5),
      branchDefault: "",
      unitDefault: "",
      branch: [],
      unit: [],
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
      return Math.ceil(this.tableData.length / this.perPage);
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
    async getList() {
      let body = {
        brn_code: "LVB100",
        dep_code: "LVB100003",
        leaveyear: new Date().getFullYear(),
      };
      await this.store.GET_DayoffHist(body);
      this.tableData = this.store.employee.DATA;

      this.total = this.store.employee.AllRECORD;
    },
    async getBranch() {
      let body = {
        action: "GET_BRANCH",
        brn_code: "",
      };
      await this.store.GET_BranchUnit(body);
      this.store.employee.DATA.map((v) => {
        this.branch.push({ title: v.PARENTUNITCODE.replace("LVB", "") });
      });
      this.branchDefault = this.branch[0].title;
      console.log("this.branchDefault", this.branchDefault);
      this.getUnit(this.branchDefault);
    },
    async getUnit(branch) {
      let body = {
        action: "GET_UNIT",
        brn_code: "LVB" + branch,
      };
      await this.store.GET_BranchUnit(body);
      this.unit = this.store.employee.DATA.map((v) => ({
        title: v.UNITNAME,
        unitCode: v.UNITCODE,
      }));

      // Set default selection to the first unit (store the entire object)
      this.unitDefault = this.unit[0].title;
    },

    async onSubmit() {
      const selectedUnit = this.unit.find((u) => u.title === this.unitDefault);

      let body = {
        leaveyear: this.year,
        brn_code: "LVB" + this.branchDefault,
        dep_code: selectedUnit ? selectedUnit.unitCode : null, // Get unitCode from unit list
      };

      console.log("object", body);
      await this.store.GET_DayoffHist(body);
      this.tableData = this.store.employee.DATA;

      this.total = this.store.employee.AllRECORD;
    },
    yearUpdate(v) {
      console.log("v", v);
      this.year = v;
    },
    branchUpdate(v) {
      console.log("v", v);
      this.branchDefault = v;
      this.unit = [];
      this.getUnit(this.branchDefault);
    },
    unitUpdate(v) {
      console.log("v", v);
      this.unitDefault = v;
    },
    perPageChange(v) {
      console.log("v", v);
      this.perPage = v;
    },
  },
  async mounted() {
    this.loadingStore.openLoading();
    this.getList(this.typeList);
    this.getBranch();
    console.log("mount", this.branchDefault);

    this.loadingStore.closeLoading();
  },
};
</script>
    
<style scoped>
</style>
    