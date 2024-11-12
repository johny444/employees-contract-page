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
  data() {
    return {
      json: [
        {
          question: "What is the capital of France?",
          options: "Paris,Madrid,London,Rome",
          answer: "Paris",
        },
        {
          question: "What is the largest organ in the human body?",
          options: "Brain,Lungs,Heart,Skin",
          answer: "Skin",
        },
        {
          question: "What is the highest mountain in the world?",
          options: "Mount Everest,K2,Kilimanjaro,Denali",
          answer: "Mount Everest",
        },
        {
          question: "What is the largest country in the world by land area?",
          options: "Paris,China,Canada,Russia",
          answer: "Russia",
        },
      ],
    };
  },
  methods: {
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.json);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "templateQuestion.xlsx");
    },
  },
};
</script>
