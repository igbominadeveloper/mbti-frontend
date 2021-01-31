<template>
  <div>
    <p class="title">Check MBTI</p>
    <div class="questions result-check">
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
        >View</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";

import { RequestStatus, Status } from "@/types";
import { getUserMbti } from "@/services";

type Data = {
  email: string;
  errors: {
    email: string;
  };
  requestStatus: RequestStatus;
};

export default Vue.extend({
  data: (): Data => ({
    email: "",
    errors: {
      email: ""
    },
    requestStatus: {
      getQuestions: Status.NORMAL,
      submitResponse: Status.NORMAL,
      getUserMbti: Status.NORMAL
    }
  }),

  computed: {
    thereAreNoErrors(): boolean {
      return !this.emailHasError;
    },

    isEmail(): boolean {
      const emailRegex = /\S+@\S+\.\S+/;
      const valid = this.email.trim().match(emailRegex);
      return valid ? true : false;
    },

    emailHasError(): boolean {
      return this.errors.email.length > 0;
    },

    responseIsBeingProcessed(): boolean {
      return this.requestStatus.getUserMbti === Status.LOADING;
    }
  },

  methods: {
    validateForm() {
      if (!this.email) {
        this.errors.email = "Please provide your email";
      } else if (!this.isEmail) {
        this.errors.email = "Please provide a valid email";
      } else {
        this.errors.email = "";
      }
    },

    submitForm() {
      this.validateForm();

      if (this.thereAreNoErrors) {
        this.requestStatus.getUserMbti = Status.LOADING;
        getUserMbti(this.email)
          .then(response => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then(response => {
            this.requestStatus.getUserMbti = Status.SUCCESS;
            localStorage.setItem("mbti", response.mbti);

            this.$router.push({
              name: "Result"
            });
          })
          .catch((error: any) => {
            this.requestStatus.getUserMbti = Status.ERROR;

            error.json().then((error: any) => {
              this.errors.email = error.error;
            });
          });
      }
    }
  }
});
</script>

<style lang="css" scoped>
.result-check {
  align-items: center;
}
.question {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.email-text {
  margin-bottom: 4rem;
}

.email-error {
  font-size: var(--font-sub-title);
}
</style>
