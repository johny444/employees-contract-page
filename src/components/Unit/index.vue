<template>
  <v-container max-width="90%">
    <h2 class="text-center pb-5">FINGER REPORT</h2>

    <v-table>
      <thead>
        <tr>
          <!-- ส่วนหัวของตาราง -->
          <th>{{ $t("No.") }}</th>
          <th>{{ $t("UNITID") }}</th>
          <th>{{ $t("UNITCODE") }}</th>
          <th>{{ $t("UNITNAME") }}</th>
          <th width="5%">{{ $t("PARENTUNITCODE") }}</th>
          <th>{{ $t("STARTDATE") }}</th>
          <th>{{ $t("ENDDATE") }}</th>
          <th>{{ $t("ESTABLISHMENTDECISIONNO") }}</th>
          <th>{{ $t("SIGNDATEOPEN") }}</th>
          <th>{{ $t("SIGNEDBYOPEN") }}</th>
          <th>{{ $t("TAXCODE") }}</th>
          <th>{{ $t("ADDRESS") }}</th>
          <th>{{ $t("TELEPHONENO") }}</th>
          <th>{{ $t("FUNCTION") }}</th>
          <th>{{ $t("CLOSUREDECISIONNO") }}</th>
          <th>{{ $t("SIGNDATECLOSE") }}</th>
          <th>{{ $t("SIGNEDBYCLOSE") }}</th>
          <th>{{ $t("REASONS") }}</th>
          <th>{{ $t("RESIDENTIALAREA") }}</th>
          <th>{{ $t("VILLAGE") }}</th>
          <th>{{ $t("DISTRICT") }}</th>
          <th>{{ $t("CITY") }}</th>
          <th>{{ $t("UNITTYPECODE") }}</th>
          <th>{{ $t("STATUS") }}</th>
          <th>{{ $t("ORDERNUMBER") }}</th>
          <th>{{ $t("BRNCODEFCC") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="paginatedData.length > 0"
          v-for="(item, i) in paginatedData"
          :key="i"
        >
          <!-- แสดงข้อมูลในตาราง -->
          <td align="center">{{ (currentPage - 1) * perPage + i + 1 }}</td>

          <td align="center">{{ item.unitId ?? "-" }}</td>
          <td align="center">{{ item.unitCode ?? "-" }}</td>
          <td align="center">{{ item.unitName ?? "-" }}</td>
          <td width="5%" align="center">{{ item.parentUnitCode ?? "-" }}</td>
          <td align="center">{{ formatDateShow(item.startDate) ?? "-" }}</td>
          <td align="center">{{ formatDateShow(item.endDate) ?? "-" }}</td>
          <td width="5%" align="center">
            {{ item.establishmentDecisionNo ?? "-" }}
          </td>
          <td align="center">{{ formatDateShow(item.signDateOpen) ?? "-" }}</td>
          <td align="center">{{ item.signedByOpen ?? "-" }}</td>
          <td align="center">{{ item.taxCode ?? "-" }}</td>
          <td align="center">{{ item.address ?? "-" }}</td>
          <td align="center">{{ item.telephoneNo ?? "-" }}</td>
          <td align="center">{{ item.function ?? "-" }}</td>
          <td align="center">{{ item.closureDecisionNo ?? "-" }}</td>
          <td align="center">
            {{ formatDateShow(item.signDateClose) ?? "-" }}
          </td>
          <td align="center">{{ item.signedByClose ?? "-" }}</td>
          <td align="center">{{ item.reasons ?? "-" }}</td>
          <td align="center">{{ item.residentialArea ?? "-" }}</td>
          <td align="center">{{ item.village ?? "-" }}</td>
          <td align="center">{{ item.district ?? "-" }}</td>
          <td align="center">{{ item.city ?? "-" }}</td>
          <td align="center">{{ item.unitTypeCode ?? "-" }}</td>
          <td align="center">{{ item.status ?? "-" }}</td>
          <td align="center">{{ item.orderNumber ?? "-" }}</td>
          <td align="center">{{ item.brnCodeFCC ?? "-" }}</td>
        </tr>

        <tr v-else>
          <td :colspan="24">
            <div style="margin-top: 1rem; text-align: center">
              <NoData />
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

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
          />
          <span class="ml-2">Page {{ currentPage }} of {{ totalPages }}</span>
        </v-container>
      </v-col>
    </v-row>

    <!-- Loading Indicator -->
    <v-row v-if="fgStore.loading" justify="center">
      <v-progress-circular indeterminate color="primary" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useFgStore } from "@/stores/fgStore"; // Import your Pinia store

const fgStore = useFgStore(); // Use the Pinia store

const perPage = ref(10); // Number of items per page
const currentPage = ref(1); // Current page number
const totalPages = computed(() =>
  Math.ceil(fgStore.units.length / perPage.value)
); // Calculate total pages
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return fgStore.units.slice(start, start + perPage.value);
});

const fetchData = async () => {
  await fgStore.GET_UNITS(); // Fetch data using the Pinia store
  currentPage.value = 1; // Reset to first page after fetching
};

const formatDateShow = (date) => {
  return date ? new Date(date).toLocaleDateString() : "-";
};

const perPageChange = (newPerPage) => {
  perPage.value = newPerPage;
  currentPage.value = 1; // Reset to first page
};

const onSubmit = () => {
  fetchData(); // Fetch data when the button is clicked
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchData();
});
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
