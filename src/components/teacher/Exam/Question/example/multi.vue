<template>
  <div id="app" class="container">
    <button class="button is-primary" @click="checkAnswers()">
      Submit Answers
    </button>
    <p class="subtitle">Score: {{ score }} out of {{ questions.length }}</p>
    <h1 class="title">
      Vue.js Quiz System with v-checkbox for Multiple Answers
    </h1>
    <div v-for="(question, index) in questions" :key="index">
      <p class="subtitle">{{ index + 1 }}. {{ question.text }}</p>
      <!-- <div class="field" v-for="(option, i) in question.options" :key="i">
        <v-checkbox
          :id="index + '-' + i"
          :name="index"
          :value="option"
          v-model="answers[index]"
        />
        <label :for="index + '-' + i">{{ option }}</label>
      </div> -->
      <v-row>
        <v-checkbox
          v-for="(option, i) in question.options"
          :key="i"
          :label="option"
          :value="option"
          :name="index.toString()"
          @change="onSelect"
        ></v-checkbox>
      </v-row>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  setup() {
    const choice = ref({});
    const onSelect = (e) => {
      // console.log("e.target.name", e.target.name);
      choice.value = { ...choice.value, [e.target.name]: e.target.value };
      console.log(" choice.value", choice.value);
    };
    return { onSelect };
  },
  data() {
    return {
      questions: [
        {
          text: "Which of the following animals can fly?",
          options: ["Penguin", "Elephant", "Bat", "Giraffe"],
          answer: ["Bat"],
        },
        {
          text: "Which of the following is a primary color?",
          options: ["Green", "Orange", "Purple", "Red"],
          answer: ["Red", "Blue", "Yellow"],
        },
        {
          text: "Which of the following is a programming language?",
          options: ["Java", "Cats", "Carrots", "C++"],
          answer: ["Java", "C++"],
        },
      ],
      answers: [],
      score: 0,
    };
  },
  methods: {
    checkAnswers() {
      console.log("this.answers", this.answers);
      this.score = 0;
      for (var i = 0; i < this.questions.length; i++) {
        if (
          this.answers[i].length === this.questions[i].answer.length &&
          this.answers[i].every((val) => this.questions[i].answer.includes(val))
        ) {
          this.score++;
        }
      }
    },
  },
};
// var app = new Vue({
//   el: "#app",
//   data: {
//     questions: [
//       {
//         text: "Which of the following animals can fly?",
//         options: ["Penguin", "Elephant", "Bat", "Giraffe"],
//         answer: ["Bat"],
//         selected: "",
//         correct: false,
//       },
//       {
//         text: "Which of the following is a primary color?",
//         options: ["Green", "Orange", "Purple", "Red"],
//         answer: ["Red", "Blue", "Yellow"],
//         selected: [],
//         correct: false,
//       },
//       {
//         text: "Which of the following is a programming language?",
//         options: ["Java", "Cats", "Carrots", "C++"],
//         answer: ["Java", "C++"],
//         selected: [],
//         correct: false,
//       },
//     ],
//     score: 0,
//   },
//   methods: {
//     checkAnswers() {
//       this.score = 0;
//       for (var i = 0; i < this.questions.length; i++) {
//         var question = this.questions[i];
//         if (question.answer.length === 1) {
//           question.correct = question.selected === question.answer[0];
//         } else {
//           question.correct =
//             JSON.stringify(question.selected) ===
//             JSON.stringify(question.answer);
//         }
//         if (question.correct) {
//           this.score++;
//         }
//       }
//     },
//   },
// });
</script>
