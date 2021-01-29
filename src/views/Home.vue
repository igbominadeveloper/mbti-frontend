<template>
  <section class="page-container">
    <p class="title">Discover your Perspective</p>
    <p class="subtitle">
      Complete the 7 min test and get a detailed report of your lenses on the
      world.
    </p>

    <div class="questions">
      <Question
        v-for="question in questions"
        :key="question.id"
        :question="question"
        :error="errors[question.id]"
        @user-decided="setDecision"
      />
      <div class="question">
        <p class="question-text">
          Your Email
        </p>

        <input
          type="text"
          :class="{ error: emailIsEmpty }"
          class="email-input"
          placeholder="you@example.com"
          required
          v-model="email"
        />
      </div>

      <button class="submit" @click="submitForm">Save & Continue</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import Question from "@/components/Question.vue";

import { Perspective, QuestionID, UserDecision } from "@/types";

type Errors = {
  email: boolean;
  "EI-1": boolean;
  "SN-1": boolean;
  "TF-1": boolean;
  "EI-2": boolean;
  "SN-2": boolean;
  "JP-1": boolean;
  "TF-2": boolean;
  "JP-2": boolean;
  "EI-3": boolean;
  "JP-3": boolean;
};
type Data = {
  questions: Array<Perspective>;
  email: string;
  errors: Errors;
};

export default Vue.extend({
  name: "Home",

  components: { Question },

  data: (): Data => ({
    questions: [
      {
        question:
          "You find it takes effort to introduce yourself to other people.",
        decision: 5,
        id: QuestionID["EI-1"]
      },
      {
        question: "You consider yourself more practical than creative",
        decision: 0,
        id: QuestionID["SN-1"]
      },
      {
        question:
          "Winning a debate matters less to you than making sure no one gets upset",
        decision: 0,
        id: QuestionID["TF-1"]
      },
      {
        question:
          "You get energized going to social events that involve many interactions.",
        decision: 0,
        id: QuestionID["EI-2"]
      },
      {
        question:
          "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
        decision: 0,
        id: QuestionID["SN-2"]
      },
      {
        question:
          "Deadlines seem to you to be of relative rather than absolute importance.",
        decision: 0,
        id: QuestionID["JP-1"]
      },
      {
        question:
          "Logic is usually more important than heart when it comes to making important decisions.",
        decision: 0,
        id: QuestionID["TF-2"]
      },
      {
        question: "Your home and work environments are quite tidy.",
        decision: 0,
        id: QuestionID["JP-2"]
      },
      {
        question: "You do not mind being at the center of attention.",
        decision: 0,
        id: QuestionID["EI-3"]
      },
      {
        question:
          "Keeping your options open is more important than having a to-do list.",
        decision: 0,
        id: QuestionID["JP-3"]
      }
    ],
    email: "",
    errors: {
      email: false,
      "EI-1": false,
      "SN-1": false,
      "TF-1": false,
      "EI-2": false,
      "SN-2": false,
      "JP-1": false,
      "TF-2": false,
      "JP-2": false,
      "EI-3": false,
      "JP-3": false
    }
  }),

  computed: {
    emailIsEmpty() {
      return this.errors.email;
    }
  },
  methods: {
    setDecision(userDecision: UserDecision) {
      const questionIndex = this.questions.findIndex(
        (question: Perspective) => question.id === userDecision.questionId
      );

      const originalQuestion = this.questions[questionIndex];

      this.questions.splice(questionIndex, 1, {
        ...originalQuestion,
        decision: userDecision.decision
      });
    },

    isEmail(emailInput: string): boolean {
      const emailRegex = /\S+@\S+\.\S+/;
      const valid = emailInput.trim().match(emailRegex);
      return valid ? true : false;
    },

    validateForm() {
      if (!this.email) {
        this.errors.email = true;
      } else {
        this.errors.email = false;
      }

      this.questions.forEach((question: Perspective) => {
        if (question.decision === 0) {
          this.errors[question.id] = true;
        } else {
          this.errors[question.id] = false;
        }
      });
    },

    submitForm() {
      this.validateForm();
    }
  }
});
</script>

<style lang="css">
.page-container {
  width: 100%;

  padding: 35px 75px;
}

.title {
  font-size: 1.6rem;
  color: var(--color-blue);
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;

  margin-bottom: 1rem;
  padding: 0;
}

.subtitle {
  color: var(--color-black);
  font-size: 1.3rem;
}

.questions {
  width: 100%;
  margin: 3rem auto;

  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 992px) {
  .questions {
    width: 50%;
  }
}
</style>
