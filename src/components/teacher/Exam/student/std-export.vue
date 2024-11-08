<template>
  <div style="text-align: center" class="mx-1">
    <h3>
      <a href="#" @click="onExport">
        {{ $t("downloadtemplate") }}
      </a>
    </h3>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  setup() {
    const json = ref([
      {
        name: "Theo O'Grada",
        studentCode: "102170011",
        birthday: "06-03-1998",
        email: "Theo O'Grada@gmail.com",
        gender: "0",
      },
      {
        name: "Christian Lovart",
        studentCode: "102170013",
        birthday: "06-03-1997",
        email: "chris@gmail.com",
        gender: "0",
      },
      {
        name: " Geneva Vasin",
        studentCode: "102170005",
        birthday: "20-06-2000",
        email: "Gen@gmail.com",
        gender: "1",
      },
      {
        name: "Natka Godbold",
        studentCode: "102170007",
        birthday: "12-06-2002",
        email: "nat@gmail.com",
        gender: "1",
      },
    ]);
    const onExport = () => {
      const dataWS = XLSX.utils.json_to_sheet(json.value);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "template.xlsx");
    };
    return { json, onExport };
  },
};
</script>

<style lang="scss" scoped></style>
