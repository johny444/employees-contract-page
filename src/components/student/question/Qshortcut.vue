<template>
  <v-row>
    <v-col style="text-align: end">
      <v-menu location="end">
        <template v-slot:activator="{ props }">
          <v-btn color="indigo" v-bind="props" icon>
            {{ completedItemCount }} / {{ items.length }}
          </v-btn>
        </template>
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
                    {{ i + 1 }}
                  </div>
                </div>
              </div>
            </v-container>
          </v-item-group>
        </div>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  items: Array,
});

const menu = ref(false);
const completedItemCount = computed(() => {
  return props.items.filter((item) => item.isOptionSelected).length;
});
</script>

<style lang="scss" scoped>
.box {
  height: 3rem;
  width: 3rem;
  // background-color: rgb(128, 128, 215);
  // background-color: #fffefe;
  color: black;
  text-align: center;
  padding: 1rem;
  border-radius: 100%;
}
.card {
  background-color: rgb(230, 213, 213);
  max-width: 600px;
  border-radius: 1rem 3rem 1rem 3rem;
}
</style>
