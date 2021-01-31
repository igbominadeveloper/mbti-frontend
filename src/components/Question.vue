<template>
  <div class="question" :class="{ error }">
    <p class="question-text" :class="{ loader: questionsAreStillLoading }">
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

    <transition name="slide-left-fade">
      <div class="error-block" v-if="error">
        Please choose from one of the options
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { Perspective, RequestStatus, Status } from "@/types";

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
    },
    requestStatus: {
      type: Object as PropType<RequestStatus>,
      required: true
    }
  },
  computed: {
    questionsAreStillLoading(): boolean {
      return this.requestStatus.getQuestions === Status.LOADING;
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

  transition: all 0.6s 0s ease-in-out;
}

.question {
  font-family: Nunito;
  position: relative;

  background: var(--color-white);
  border: 1px solid var(--color-grey);

  box-sizing: border-box;
  border-radius: 4px;

  padding: 2.5rem;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.question-text {
  font-size: var(--font-sub-title);
  font-style: normal;
  font-weight: bold;
}

.question-text {
  position: relative;
  width: 100%;

  text-align: center;
  letter-spacing: 0.4px;
}

.loader {
  position: relative;
  width: 100%;
  height: 2rem;
}

.loader::before {
  position: absolute;
  content: "";
  left: 0;

  height: 100%;
  width: 100%;

  background-image: linear-gradient(
    to right,
    #d9d9d9 0%,
    rgba(0, 0, 0, 0.05) 20%,
    #d9d9d9 40%,
    #d9d9d9 100%
  );
  background-repeat: no-repeat;
  background-size: 100%, 1rem;

  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -450px 0;
  }
  100% {
    background-position: 450px 0;
  }
}

.decisions {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin: 3rem 0;
}

.grade {
  display: flex;

  justify-content: center;
  align-items: center;

  margin: 0.3rem 0;

  cursor: pointer;
}

.radio-button {
  border: 3px solid #aaaaaa;
  border-radius: 50%;

  height: 2rem;
  width: 2rem;

  margin: 0.5rem;
}

@media screen and (min-width: 992px) {
  .question {
    height: 16rem;
    padding: 2rem;
  }

  .decisions {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .grade {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    margin: 0 1rem;

    cursor: pointer;
  }

  .radio-button {
    margin-bottom: 0.3rem;
  }
}

.agree,
.disagree {
  font-size: var(--font-sub-title);
}
.disagree {
  margin-right: 1rem;

  color: var(--color-red);
}

.agree {
  margin-left: 1rem;

  color: var(--color-green);
}
</style>
