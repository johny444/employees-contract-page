<template>
  <div>
    <v-btn
      color="blue-darken-3"
      class="mb-6"
      @click="onExport"
      append-icon="fa-solid fa-file-export"
      >EXPORT
    </v-btn>
  </div>
</template>
  
<script>
import * as XLSX from "xlsx";
import moment from "moment";
export default {
  props: ["dataExport"],
  data() {
    return {
      loadingStore: useLoadingStore(),
      AlertStore: useAlertStore(),
    };
  },
  mounted() {
    console.log("dataExport", this.dataExport);
  },
  methods: {
    onExport() {
      this.loadingStore.openLoading();

      let clonedData = JSON.parse(JSON.stringify(this.dataExport));

      clonedData.forEach((item) => {
        if (item.STARTDATE) {
          item.STARTDATE = moment(item.STARTDATE).format("DD-MM-YYYY"); // Format only date
        }
        if (item.ENDDATE) {
          item.ENDDATE = moment(item.ENDDATE).format("DD-MM-YYYY"); // Format only date if not null
        }
        if (item.FROMDATE) {
          item.FROMDATE = moment(item.FROMDATE).format("DD-MM-YYYY"); // Format only date
        }
        if (item.TODATE) {
          item.TODATE = moment(item.TODATE).format("DD-MM-YYYY"); // Format only date if not null
        }
      });

      console.log("dateFormat", clonedData);
      try {
        const dataWS = XLSX.utils.json_to_sheet(clonedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dataWS);
        XLSX.writeFile(wb, "employee-contract.xlsx");
        this.AlertStore.openDialog("S", this.$t("export successfully"));
        setTimeout(() => {
          this.AlertStore.closeDialog();
        }, 1000);
      } catch (e) {
        this.AlertStore.openDialog("E", e);
        setTimeout(() => {
          this.AlertStore.closeDialog();
        }, 2000);
      }
      this.loadingStore.closeLoading();
    },
  },
};
</script>
  
  <style scoped>
</style>
