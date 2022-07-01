const SENTENCES = [
  "The quick brown fox jumped over the fence.",
  "It's been over a fence, I'm starting to think that tractor is never coming back.",
  "What do you believe to be the answer to my problems?",
];

var app = new Vue({
  el: "#app",
  data: {
    testRunning: false,
    randomSentence: "",
    userInput: "",
    timeElapsed: 0,
    startTime: 0,
    endTime: 0,
    wordsPerMinute: 0,
  },
  methods: {
    startRace: function () {
      this.startTime = new Date();
    },
    getRandomSentence: function () {
      let randomNumber = Math.floor(Math.random() * SENTENCES.length);
      let randomSentenceVariable = SENTENCES[randomNumber];
      this.randomSentence = randomSentenceVariable;
    },
    calculateTotalTime: function () {
      this.timeElapsed = this.endTime - this.startTime;
      // seconds instead of miliseconds
      this.timeElapsed /= 1000;
      Math.round(this.timeElapsed);

      let x = this.timeElapsed;
      let y = x / 60;

      let str = this.randomSentence;
      let wordCount = str.trim().split(/\s+/).length;
      let wpm = wordCount / y;
      console.log(wpm);
      this.wordsPerMinute = Math.round(wpm);
    },
    resetTest: function () {
      this.testRunning = false;
      this.userInput = "";
      this.timeElapsed = 0;
      this.startTime = 0;
      this.endTime = 0;
    },
    resetWithNewSentence: function () {
      this.resetTest();
      this.getRandomSentence();
    },
  },
  computed: {
    // this function runs whenever the sentence the user is typing changes
    // use it like a variable (v-if="finishedTyping")
    finishedTyping: function () {
      // you probably wanna use your variable here in place of these awful ones
      if (this.randomSentence == this.userInput) {
        this.endTime = new Date();
        this.calculateTotalTime();
        return true;
      } else {
        return false;
      }
    },
  },
  created: function () {
    this.getRandomSentence();
  },
});

/*
  
  extra cool additions:
   - Keep a high score that stays between attempts
   - Let the user pick the sentence that they will be typing
   - Show a timer on the screen as they are typing
  
  */
