<template>
  <h1 class="title">Vue.js Quiz System</h1>
  {{ answers }}
  <div v-for="(question, index) in questions" :key="index">
    <p class="subtitle">{{ index + 1 }}. {{ question.text }}</p>
    <div class="field" v-for="(option, i) in question.options" :key="i">
      <input
        type="radio"
        :id="index + '-' + i"
        :name="index"
        :value="option"
        v-model="answers[index]"
      />
      <label :for="index + '-' + i">{{ option }}</label>
    </div>
  </div>
  <br />
  <button class="button is-primary" @click="checkAnswers()">
    Submit Answers
  </button>
  <p class="subtitle">Score: {{ score }} out of {{ questions.length }}</p>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          text: "What is the capital of France?",
          options: ["Paris", "Madrid", "London", "Rome"],
          answer: "Paris",
        },
        {
          text: "What is the largest organ in the human body?",
          options: ["Brain", "Lungs", "Heart", "Skin"],
          answer: "Skin",
        },
        {
          text: "What is the highest mountain in the world?",
          options: ["Mount Everest", "K2", "Kilimanjaro", "Denali"],
          answer: "Mount Everest",
        },
        {
          text: "What is the smallest country in the world?",
          options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
          answer: "Vatican City",
        },
        {
          text: "What is the largest country in the world by land area?",
          options: ["Paris", "China", "Canada", "Russia"],
          answer: "Russia",
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
        if (this.answers[i] === this.questions[i].answer) {
          this.score++;
        }
      }
    },
  },
};
</script>
