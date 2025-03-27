<template>
  <thead>
    <tr>
      <th v-for="item in dataHeader" :key="item">{{ $t(item) }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: ["dataHeader"],
  data() {
    return {};
  },
};
</script>

<style>
</style>