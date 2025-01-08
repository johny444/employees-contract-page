<template>
  <div class="main-container pa-2">
    <div class="header">
      <v-row>
        <v-col align="center">
          <h1>Employees Contract list</h1>
        </v-col>
      </v-row>
      <div class="action">
        <v-row>
          <h3 class="label px-5">FROM</h3>
          <v-col cols="2">
            <v-text-field
              density="compact"
              variant="outlined"
              type="date"
            ></v-text-field>
          </v-col>
          <h3 class="label">TO</h3>
          <v-col cols="2">
            <v-text-field
              density="compact"
              variant="outlined"
              type="date"
            ></v-text-field
          ></v-col>
          <v-col>
            <v-btn>Submit</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-container max-width="90%">
      <v-table>
        <thead>
          <tr>
            <th>{{ $t("rowNum") }}</th>
            <th>{{ $t("NAME") }}</th>
            <th>{{ $t("CONTRACT NO") }}</th>
            <th>{{ $t("DURATION") }}</th>
            <th>{{ $t("STARTDATE") }}</th>
            <th>{{ $t("ENDDATE") }}</th>
            <th>{{ $t("POSITION") }}</th>
            <th>{{ $t("DEPARTMENT") }}</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(item, i) in tableData" :key="item.name">
              <td width="5%" align="center">{{ i + 1 }}</td>
              <td width="10%">{{ item.classExamid.subjectExam }}</td>
              <td width="20%">{{ item.time }}</td>
              <td width="10%">{{ item.classExamid.classExam }}</td>
              <td width="10%">
                {{ item.term === "mid" ? $t("midterm") : $t("finalterm") }}
              </td>
              <td width="12%">
                <v-row justify="center" style="margin: 1rem">
                  <!-- <NuxtLink :to="`/quiz/${item.id}`"> -->
                  <v-btn
                    variant="text"
                    density="compact"
                    icon="fa-solid fa-plus"
                    size="medium"
                    @click="startExam(item.id)"
                  >
                    <v-icon
                      style="color: #046b5a"
                      icon="fa-solid fa-file-circle-question"
                    />
                    <v-tooltip activator="parent" location="start">{{
                      $t("startExam")
                    }}</v-tooltip>
                  </v-btn>
                  <!-- </NuxtLink> -->
                </v-row>
              </td>
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
        <template #bottom v-if="tableData.length > 0">
          <table-pagination
            :itemList="store.examList.length"
            :perPage="perPage"
            @valueChange="onPageChange"
          ></table-pagination>
        </template>
      </v-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      perPage: 10,
      searchText: "",
      loading: true, // Add loading state
    };
  },
};
</script>

<style  scoped>
.main-container {
  min-height: 100vh;
  /* border: 0.1rem solid;
  border-color: red; */
}

.label {
  margin: 1rem 0 1rem 0;
}
</style>