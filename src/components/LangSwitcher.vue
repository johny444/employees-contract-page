<template>
  <div class="mx-5">
    <v-btn color="white">
      <img
        v-if="locale == 'la'"
        src="@/assets/images/flag/la.png"
        height="20"
      />
      <img v-else src="@/assets/images/flag/en.png" height="20" />
      <span class="ml-2"> {{ $t("language") }}</span>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            :active="locale == 'en' ? true : false"
            @click="onSetLanguage('en')"
          >
            <template v-slot:prepend>
              <img src="@/assets/images/flag/en.png" height="20" />
            </template>
            <v-list-item-title class="ml-2">{{ "English" }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            :active="locale == 'la' ? true : false"
            @click="onSetLanguage('la')"
          >
            <template v-slot:prepend>
              <img src="@/assets/images/flag/la.png" height="20" />
            </template>
            <v-list-item-title class="ml-2">{{ "ພາສາລາວ" }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>
<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { locale } = useI18n();
    const lang = ref("");

    onMounted(() => {
      // lang.value = localStorage.getItem("i18n");
      locale.value = localStorage.getItem("i18n") || "en";
    });

    const onSetLanguage = (v) => {
      console.log("object", v);
      localStorage.setItem("i18n", v);
      locale.value = v;
      lang.value = v;
    };
    return { lang, locale, onSetLanguage };
  },
};
</script>
