<template>
  <div>
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
        :requestStatus="requestStatus"
        @user-decided="setDecision"
      />
      <div class="question">
        <p class="email-text">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Question from "@/components/Question.vue";

import {
  dummyQuestions,
  Perspective,
  Question as QuestionResponse,
  RequestStatus,
  Status,
  UserDecision
} from "@/types";

type Errors = {
  email: boolean;
  "EI-1": boolean;
  "EI-2": boolean;
  "EI-3": boolean;
  "SN-1": boolean;
  "SN-2": boolean;
  "TF-1": boolean;
  "TF-2": boolean;
  "JP-1": boolean;
  "JP-2": boolean;
  "JP-3": boolean;
};
type Data = {
  questions: Array<Perspective>;
  email: string;
  errors: Errors;
  requestStatus: RequestStatus;
};

export default Vue.extend({
  name: "Home",

  components: { Question },

  data: (): Data => ({
    questions: dummyQuestions,
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
    },
    requestStatus: {
      getQuestions: Status.NORMAL
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
  },
  created() {
    const apiUrl = process.env.VUE_APP_API_URL;
    // make API call

    this.requestStatus.getQuestions = Status.LOADING;

    fetch(`${apiUrl}/questions`)
      .then(response => response.json())
      .then(response => {
        this.questions = response.questions.map(
          (question: QuestionResponse) => ({
            question: question.question,
            decision: 0,
            id: question.shortcode
          })
        );

        this.requestStatus.getQuestions = Status.SUCCESS;
      })
      .catch((error: string) => {
        this.requestStatus.getQuestions = Status.ERROR;
        console.log(error);
      });
  }
});
</script>

<style lang="css">
.title {
  font-size: var(--font-title);
  color: var(--color-blue);
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;

  margin-bottom: 1.5rem;
  padding: 0;
}

.subtitle {
  color: var(--color-black);
  font-size: 1.4rem;

  font-weight: 600;
}

.questions {
  width: 100%;
  margin: 5rem auto;

  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 992px) {
  .questions {
    width: 60%;
  }
}
</style>
