<template>
  <div class="text-center mt-10 d-flex justify-center">
    <v-progress-circular
      :model-value="progressValue"
      :rotate="360"
      :size="progressCircleSize"
      :width="10"
      :color="progressColor"
      :class="{ blinking: isBlinking }"
    >
      <template v-slot:default>
        <span :style="{ fontSize: `${progressCircleSize / 6}px` }">
          {{ formattedTime }}
        </span>
      </template>
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdownSeconds: 10, // Countdown duration in seconds
      totalTime: 0,
      progressValue: 100,
      formattedTime: "",
      countdownInterval: null,
      progressCircleSize: 250, // Initial size
      isBlinking: false,
      progressColor: "teal",
    };
  },
  mounted() {
    // Get saved time from localStorage or start a new countdown
    const savedTime = localStorage.getItem("remainingTime");
    const lastSavedTimestamp = localStorage.getItem("lastSavedTimestamp");
    if (savedTime && lastSavedTimestamp) {
      const elapsed = Math.floor((Date.now() - lastSavedTimestamp) / 1000);
      const remainingTime = Math.max(savedTime - elapsed, 0);
      this.totalTime = remainingTime;
    } else {
      this.totalTime = this.countdownSeconds;
    }

    // Calculate progressValue based on totalTime
    this.progressValue = (this.totalTime / this.countdownSeconds) * 100;

    this.formattedTime = this.formatTime(this.totalTime);
    window.addEventListener("resize", this.updateProgressCircleSize);
    this.updateProgressCircleSize();
    this.startCountdown();
  },
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(remainingSeconds).padStart(2, "0")}`;
    },
    updateProgressCircleSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        this.progressCircleSize = 150;
      } else if (screenWidth >= 600 && screenWidth < 1024) {
        this.progressCircleSize = 200;
      } else {
        this.progressCircleSize = 250;
      }
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.totalTime === 0) {
          this.progressColor = "green"; // Change color to success
          this.isBlinking = false; // Stop blinking
          clearInterval(this.countdownInterval);
          localStorage.removeItem("remainingTime");
          localStorage.removeItem("lastSavedTimestamp");
          return;
        }

        this.totalTime--;
        this.progressValue = (this.totalTime / this.countdownSeconds) * 100;
        this.formattedTime = this.formatTime(this.totalTime);

        // Save remaining time and timestamp to localStorage
        localStorage.setItem("remainingTime", this.totalTime);
        localStorage.setItem("lastSavedTimestamp", Date.now());

        // Blinking effect and color change
        if (this.totalTime <= 5) {
          this.isBlinking = true;
          this.progressColor = "orange"; // Warn color for last 5 seconds
        } else {
          this.isBlinking = false;
          this.progressColor = "teal"; // Default color
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
};
</script>

<style scoped>
.blinking {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
