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
export default {
  name: "langSwitcher",
  data() {
    return {
      lang: "", // Store the language value in data
    };
  },

  computed: {
    locale() {
      return this.$i18n.locale; // Access the locale using this.$i18n in Options API
    },
  },
  methods: {
    onSetLanguage(v) {
      console.log("object", v);
      localStorage.setItem("i18n", v); // Store language preference in localStorage
      this.$i18n.locale = v; // Set the locale value using this.$i18n
      this.lang = v; // Set the language value
    },
  },
  mounted() {
    // Set the initial locale when the component is mounted
    this.$i18n.locale = localStorage.getItem("i18n") || "en";
    this.lang = this.$i18n.locale; // Initialize lang with the current locale
  },
};
</script>

