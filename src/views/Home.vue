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
          type="email"
          :class="{ error: emailHasError }"
          class="email-input"
          placeholder="you@example.com"
          required
          v-model="email"
        />
        <transition name="slide-left-fade">
          <p class="email-error">{{ errors["email"] }}</p>
        </transition>
      </div>

      <BaseButton @click="submitForm" :loading="responseIsBeingProcessed"
        >Save & Continue</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Question from "@/components/Question.vue";
import BaseButton from "@/components/BaseButton.vue";

import { getQuestions, submitResponse } from "@/services";

import {
  dummyQuestions,
  Perspective,
  Question as QuestionResponse,
  QuestionID,
  RequestStatus,
  Status,
  UserDecision,
  UserResponseObject
} from "@/types";

type Errors = {
  email: string;
  "ei-1": boolean;
  "ei-2": boolean;
  "ei-3": boolean;
  "sn-1": boolean;
  "sn-2": boolean;
  "tf-1": boolean;
  "tf-2": boolean;
  "jp-1": boolean;
  "jp-2": boolean;
  "jp-3": boolean;
};
type Data = {
  questions: Array<Perspective>;
  email: string;
  errors: Errors;
  requestStatus: RequestStatus;
};

export default Vue.extend({
  name: "Home",

  components: { Question, BaseButton },

  data: (): Data => ({
    questions: dummyQuestions,
    email: "",
    errors: {
      email: "",
      "ei-1": false,
      "sn-1": false,
      "tf-1": false,
      "ei-2": false,
      "sn-2": false,
      "jp-1": false,
      "tf-2": false,
      "jp-2": false,
      "ei-3": false,
      "jp-3": false
    },
    requestStatus: {
      getQuestions: Status.NORMAL,
      submitResponse: Status.NORMAL,
      getUserMbti: Status.NORMAL
    }
  }),

  computed: {
    emailHasError(): boolean {
      return this.errors.email.length > 0;
    },

    isEmail(): boolean {
      const emailRegex = /\S+@\S+\.\S+/;
      const valid = this.email.trim().match(emailRegex);
      return valid ? true : false;
    },

    thereAreNoErrors(): boolean {
      const responseErrors = { ...this.errors };
      delete responseErrors.email;

      return (
        !this.emailHasError &&
        !Object.values(responseErrors).some(
          (value: boolean | string) => value == true
        )
      );
    },

    responseIsBeingProcessed(): boolean {
      return this.requestStatus.submitResponse === Status.LOADING;
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

    validateForm() {
      if (!this.email) {
        this.errors.email = "Please provide your email";
      } else if (!this.isEmail) {
        this.errors.email = "Please provide a valid email";
      } else {
        this.errors.email = "";
      }

      this.questions.forEach((question: Perspective) => {
        if (question.decision === 0) {
          this.errors[question.id] = true;
        } else {
          this.errors[question.id] = false;
        }
      });
    },

    prepareFormForSubmission(): UserResponseObject {
      const ei1 = this.getValue(QuestionID["ei-1"]);
      const sn1 = this.getValue(QuestionID["sn-1"]);
      const tf1 = this.getValue(QuestionID["tf-1"]);
      const ei2 = this.getValue(QuestionID["ei-2"]);
      const sn2 = this.getValue(QuestionID["sn-2"]);
      const jp1 = this.getValue(QuestionID["jp-1"]);
      const tf2 = this.getValue(QuestionID["tf-2"]);
      const jp2 = this.getValue(QuestionID["jp-2"]);
      const ei3 = this.getValue(QuestionID["ei-3"]);
      const jp3 = this.getValue(QuestionID["jp-3"]);

      return {
        "ei-1": ei1,
        "sn-1": sn1,
        "tf-1": tf1,
        "ei-2": ei2,
        "sn-2": sn2,
        "jp-1": jp1,
        "tf-2": tf2,
        "jp-2": jp2,
        "ei-3": ei3,
        "jp-3": jp3,
        email: this.email
      };
    },

    getValue(field: QuestionID): number {
      const object = this.questions.find(
        (question: Perspective) => question.id === field
      );
      if (object) return object.decision;
      return 0;
    },

    submitForm() {
      this.validateForm();

      if (this.thereAreNoErrors) {
        this.requestStatus.submitResponse = Status.LOADING;
        const userResponse: UserResponseObject = this.prepareFormForSubmission();

        submitResponse(userResponse)
          .then(response => response.json())
          .then(response => {
            localStorage.setItem("mbti", response.mbti);

            this.requestStatus.submitResponse = Status.LOADING;

            this.$router.push({
              name: "Result"
            });
          })
          .catch((error: string) => {
            this.requestStatus.submitResponse = Status.ERROR;
            console.log(error);
          });
      }
    }
  },
  created() {
    this.requestStatus.getQuestions = Status.LOADING;

    getQuestions()
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
