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
          <h3 class="label px-4">FROM</h3>
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
    <v-icon style="color: #046b5a" icon="fa-solid fa-file-circle-question" />
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
.action {
  min-height: 100vh;
}
.label {
  margin: 1rem 0 1rem 0;
}
</style>