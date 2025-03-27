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
            <v-btn color="teal-darken-3" class="mb-6" type="submit"
              >Apply</v-btn
            >
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
                <h3 class="pa-2">
                  {{ $t("total") }}: {{ filteredData.length }}
                </h3>
              </v-col>

              <v-col align="end">
                <template v-if="paginatedData.length > 0">
                  <Export-excel :dataExport="paginatedData" />
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
          <th>{{ $t("USERNAME") }}</th>
          <th>{{ $t("FULLNAME") }}</th>
          <th>{{ $t("branch") }}</th>
          <th>{{ $t("DEPARTMENTNAME") }}</th>
          <th>{{ $t("DATEVALUE") }}</th>
          <th>{{ $t("CLOCKIN") }}</th>
          <th>{{ $t("CLOCKOUT") }}</th>
          <th>{{ $t("STATUS") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="filteredData.length > 0">
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td class="text-center">
              {{ index + 1 + (currentPage - 1) * rowsPerPage }}
            </td>
            <td class="text-center">{{ item.USERNAME }}</td>
            <td class="text-center">{{ item.FULLNAME }}</td>
            <td class="text-center">{{ item.BRANCH }}</td>
            <td class="text-center">{{ item.DEPARTMENTNAME }}</td>
            <td class="text-center">{{ formatDate(item.DATEVALUE) }}</td>
            <td class="text-center">
              {{ item.CLOCKIN ? formatDate(item.CLOCKIN) : "-" }}
            </td>
            <td class="text-center">
              {{ item.CLOCKOUT ? formatDate(item.CLOCKOUT) : "-" }}
            </td>
            <td class="text-center">{{ item.STATUS }}</td>
          </tr>
        </template>
        <tr v-if="paginatedData.length === 0">
          <td colspan="9">
            <div style="margin-top: 1rem; text-align: center">
              <NoData />
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination Controls -->
    <div>
      <v-row justify="space-between" no-gutters>
        <v-col>
          <item-page
            :pageProp="rowsPerPage"
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
import axios from "axios";
import moment from "moment";
import { useFingerStore } from "@/stores/fingerStore";

export default {
  data() {
    return {
      fingerStore: useFingerStore(),
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      tableData: [],
      search: "",
      rowsPerPage: 10,
      currentPage: 1,
    };
  },

  computed: {
    filteredData() {
      const searchTerm = this.search.trim().toLowerCase();
      return this.tableData.filter(
        (item) =>
          item.USERNAME.toLowerCase().includes(searchTerm) ||
          item.FULLNAME.toLowerCase().includes(searchTerm) ||
          item.DEPARTMENTNAME.toLowerCase().includes(searchTerm)
      );
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredData.slice(start, start + this.rowsPerPage);
    },

    totalPages() {
      return Math.ceil(this.filteredData.length / this.rowsPerPage);
    },
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/finger`,
          {
            params: {
              branch: "LVB050", // Specify branch if necessary
              startDate: this.startDate,
              endDate: this.endDate,
            },
          }
        );
        if (response.data.message === "ดึงข้อมูลสำเร็จ") {
          this.tableData = response.data.data;
        } else {
          console.error("Unexpected response message:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    formatDate(date) {
      return moment(date).format("MM/DD/YYYY"); // Adjust format as needed
    },

    onSubmit() {
      this.fetchData(); // Fetch data according to selected dates
    },

    perPageChange(newPerPage) {
      this.rowsPerPage = newPerPage;
      this.currentPage = 1; // Reset to first page when changing rows per page
    },
  },

  mounted() {
    this.fetchData(); // Fetch data when component mounts
  },
};
</script>

<style scoped>
.action {
  margin-bottom: 20px;
}
.label {
  margin-bottom: 1rem;
}
</style>
