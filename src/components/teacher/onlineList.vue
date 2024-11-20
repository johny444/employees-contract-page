<template>
  <v-container>
    <v-col align="center"> <h1>online List</h1> </v-col>
    <v-table>
      <thead>
        <tr>
          <th>{{ $t("rowNum") }}</th>
          <th>{{ $t("user") }}</th>
          <th>{{ $t("createDate") }}</th>
          <th>{{ $t("status") }}</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!loading && tableData.length > 0">
          <tr v-for="(item, i) in tableData" :key="item.name" align="center">
            <td width="5%">{{ i + 1 }}</td>
            <td width="10%">{{ item.subjectExam }}</td>
            <td width="20%">{{ item.time }}</td>
            <td width="10%">
              <v-btn
                variant="tonal"
                rounded="xl"
                @click="clickStatus(item)"
                :color="item.status === 'A' ? 'primary' : 'red'"
              >
                <template v-if="item.status === `A`">
                  {{ $t("activate") }}
                </template>
                <template v-else>
                  {{ $t("disable") }}
                </template>
              </v-btn>
            </td>
            <td width="5%">
              <v-row justify="center" style="margin: 1rem">
                <update-class :data="item" @updateclass="receiveCUD" />
                <v-spacer></v-spacer>
                <del-class :item="item.id" @Delclass="receiveCUD" />
              </v-row>
            </td>
          </tr>
        </template>
        <template v-else-if="!loading && tableData.length === 0">
          <td :colspan="9">
            <div style="margin-top: 1rem; text-align: center">
              <no-data></no-data>
            </div>
          </td>
        </template>
      </tbody>
      <template #bottom v-if="tableData.length > 0"> </template>
    </v-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style scoped>
</style>