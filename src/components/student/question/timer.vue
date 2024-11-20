<template>
  <div class="text-center mt-10 d-flex justify-center">
    <v-progress-circular
      :model-value="progressValue"
      :rotate="360"
      :size="progressCircleSize"
      :width="5"
      color="teal"
      :class="isBlinking ? 'blink-bg' : 'progress'"
    >
      <template v-slot:default> {{ formattedTime }} </template>
    </v-progress-circular>
  </div>
</template>
<script setup>
import { useTimerStore as timer } from "/stores/timer";

const countdownSeconds = 10; // Change this to set the countdown duration in seconds
const totalTime = ref(countdownSeconds);
const progressValue = ref(100);
const formattedTime = ref(formatTime(totalTime.value));

let countdownInterval;
let isFlashing = false;
let currentColor = "teal";
const progressCircleSize = ref(250); // Initial size
const isBlinking = ref(false);
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateProgressCircleSize() {
  const screenWidth = window.innerWidth;
  // Adjust the size based on screen width
  if (screenWidth < 600) {
    progressCircleSize.value = 150;
  } else if (screenWidth >= 600 && screenWidth < 1024) {
    progressCircleSize.value = 200;
  } else {
    progressCircleSize.value = 250;
  }
}
onMounted(() => {
  window.addEventListener("resize", () => {
    updateProgressCircleSize();
  });
  updateProgressCircleSize();
  countdownInterval = setInterval(() => {
    if (totalTime.value === 0) {
      clearInterval(countdownInterval);
      return;
    }
    totalTime.value--;
    progressValue.value = (totalTime.value / countdownSeconds) * 100;
    formattedTime.value = formatTime(totalTime.value);

    // Blinking effect
    isBlinking.value = totalTime.value <= 5;
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(countdownInterval);
});
</script>
<style scoped>
.progress {
  font-size: 4rem;
  transition: font-size 0.3s ease;
}
@media screen and (min-width: 600px) {
  .progress {
    font-size: 3rem; /* Font size for smaller screens */
  }
}

@media screen and (min-width: 1024px) {
  .progress {
    font-size: 4rem; /* Font size for larger screens */
  }
}
.session-info {
  margin-top: 2rem;
}

.blink-bg {
  font-size: clamp(2rem, 4vw, 4rem);
  color: #fff;
  animation: blinkingBackground 2s infinite;
  border-radius: 12rem;
}

@keyframes blinkingBackground {
  0% {
    background-color: #ef0a1a;
  }
  25% {
    background-color: teal;
  }
  50% {
    background-color: #ef0a1a;
  }
  75% {
    background-color: teal;
  }
  100% {
    background-color: #ef0a1a;
  }
}
</style>
