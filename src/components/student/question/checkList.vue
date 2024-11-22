<template>
  <div>
    <div class="card">
      <v-item-group multiple>
        <v-container>
          <div class="d-flex flex-wrap">
            <div v-for="(item, i) in items" :key="i">
              <div
                class="box ma-2"
                :style="{
                  'background-color': item.isOptionSelected
                    ? 'rgb(128, 128, 215)'
                    : '#fffefe',
                }"
              >
                <h3>
                  {{ i + 1 }}
                </h3>
              </div>
            </div>
          </div>
        </v-container>
      </v-item-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  computed: {
    completedItemCount() {
      return this.items.filter((item) => item.isOptionSelected).length;
    },
  },
};
</script>

<style  scoped>
.box {
  height: 3rem;
  width: 3rem;
  color: black;
  text-align: center;
  padding: 1rem;
  border-radius: 100%;
}
.card {
  background-color: rgb(230, 213, 213);
  max-width: 600px;
  border-radius: 1rem 1rem 1rem 1rem;
}
</style>