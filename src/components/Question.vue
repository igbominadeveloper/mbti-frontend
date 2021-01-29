<template>
  <div class="question" :class="{ error }">
    <p class="question-text">
      {{ question.question }}
    </p>
    <div class="decisions">
      <p class="disagree">Disagree</p>

      <div
        class="grade"
        v-for="option in options"
        :key="option"
        @click="setDecision(option)"
      >
        <div
          class="radio-button"
          :class="{ clicked: Number(clickedOption) === option }"
        ></div>
        <span>{{ option }}</span>
      </div>

      <p class="agree">Agree</p>
    </div>

    <div class="error-block" v-if="error">
      Please choose from one of the options
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { Perspective } from "@/types";

type Data = {
  clickedOption: string | number;
  options: Array<number>;
};

export default Vue.extend({
  data: (): Data => ({
    clickedOption: "",
    options: [1, 2, 3, 4, 5, 6, 7]
  }),
  props: {
    question: {
      type: Object as PropType<Perspective>,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setDecision(chosenOption: number) {
      if (Number(this.clickedOption) === chosenOption) return;

      this.clickedOption = chosenOption;

      this.$emit("user-decided", {
        decision: chosenOption,
        questionId: this.question.id
      });
    }
  }
});
</script>

<style lang="css">
.clicked {
  background: var(--color-purple);

  transition: all 1s 0s ease-in-out;
}

.question {
  font-family: Nunito;
  position: relative;

  background: var(--color-white);
  border: 1px solid var(--color-grey);

  box-sizing: border-box;
  border-radius: 4px;

  height: 12rem;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.question-text {
  font-size: 1.4rem;
  font-style: normal;
  font-weight: bold;
}

.decisions {
  font-size: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grade {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  margin: 0 1.5rem;

  cursor: pointer;
}

.radio-button {
  border: 3px solid #aaaaaa;
  border-radius: 50%;

  height: 2rem;
  width: 2rem;

  margin-bottom: 0.3rem;
}

.disagree {
  margin-right: 1rem;

  color: var(--color-red);
}

.agree {
  margin-left: 1rem;

  color: var(--color-green);
}

.email-input {
  background: var(--color-white);
  box-sizing: border-box;
  outline: none;

  border: 1.3px solid #aaaaaa;
  border-radius: 4px;

  width: 80%;

  padding: 0.6rem 1.5rem;
  margin-bottom: 0.1rem;
}

@media screen and (min-width: 992px) {
  .email-input {
    width: 50%;
  }
}

input:focus,
input:active {
  box-shadow: var(--box-shadow);
}

input::placeholder {
  color: var(--color-grey);
}

input.error {
  border: 1.5px solid var(--color-red);
}

.submit {
  background: var(--color-light-blue);
  color: var(--color-white);
  border-radius: 4px;

  padding: 0.7rem 1.5rem;
  margin: 5rem 0;

  width: 15rem;

  align-self: center;
  border: none;
  outline: none;
  cursor: pointer;
}

.error-block {
  color: var(--color-white);
  opacity: 0.7;
  background: var(--color-purple);
  border-radius: 4px;

  position: absolute;
  right: -30rem;
  top: 4rem;

  font-size: 12px;

  padding: 10px;
}
</style>
