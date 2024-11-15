<template>
  <div>
    <v-app id="inspire">
      <Header />
      <v-main>
        <v-container class="py-8 px-6" fluid>
          <v-row>
            <v-col>
              <v-navigation-drawer permanent>
                <v-list class="mt-8">
                  <v-list-item
                    border
                    v-for="[icon, text, routing] in links"
                    :key="icon"
                    :prepend-icon="icon"
                    :title="$t(text)"
                    link
                    :to="routing"
                  >
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
              <slot />
            </v-col>
            <v-col cols="6" md="3">
              <profile />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
  
<script setup >
import { useLoadingStore } from "@/stores/loadingStore";
const loadingStore = useLoadingStore();

const drawer = ref(null);
const route = useRoute();
const logined = ref();
const links = [
  ["fa-solid fa-gear", "Dashboard", "/dashboard"],
  ["fa-solid fa-gear", "classExam", "/class"],
  ["fa-solid fa-gear", "exam", "/exam"],
  ["fa-solid fa-gear", "result", "/result"],
];

onMounted(() => {
  // loadingStore.openLoading();
  // loadingStore.open = true;
  // console.log("layout");
  // loadingStore.closeLoading();
});
const onClick = () => {
  console.log("route.params", route.params);
};
</script>
  