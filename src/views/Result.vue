<template>
  <section class="results">
    <div class="description">
      <p class="title">Your Perspective</p>
      <p class="result">
        Your Perspective Type is <span class="mbti">{{ mbti }}</span>
      </p>
    </div>

    <div class="breakdown">
      <div class="result-row">
        <div class="result-text">Introversion (I)</div>
        <div class="bar">
          <div class="left" :class="{ chosen: eiIsLeft }"></div>
          <div class="right" :class="{ chosen: !eiIsLeft }"></div>
        </div>
        <div class="result-text">Extroversion (E)</div>
      </div>

      <div class="result-row">
        <div class="result-text">Sensing (S)</div>
        <div class="bar">
          <div class="left" :class="{ chosen: snIsLeft }"></div>
          <div class="right" :class="{ chosen: !snIsLeft }"></div>
        </div>
        <div class="result-text">Intuition (I)</div>
      </div>

      <div class="result-row">
        <div class="result-text">Thinking (T)</div>
        <div class="bar">
          <div class="left" :class="{ chosen: tfIsLeft }"></div>
          <div class="right" :class="{ chosen: !tfIsLeft }"></div>
        </div>
        <div class="result-text">Feeling (F)</div>
      </div>

      <div class="result-row">
        <div class="result-text">Judging (J)</div>
        <div class="bar">
          <div class="left" :class="{ chosen: jpIsLeft }"></div>
          <div class="right" :class="{ chosen: !jpIsLeft }"></div>
        </div>
        <div class="result-text">Perceiving (P)</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    mbti(): string {
      return localStorage.getItem("mbti") || "";
    },
    eiIsLeft(): boolean {
      return this.mbti.charAt(0) === "I";
    },
    snIsLeft(): boolean {
      return this.mbti.charAt(1) === "S";
    },
    tfIsLeft(): boolean {
      return this.mbti.charAt(2) === "T";
    },
    jpIsLeft(): boolean {
      return this.mbti.charAt(3) === "J";
    }
  }
});
</script>

<style>
.results {
  height: 40rem;
  max-width: 90%;

  margin: 0 auto;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--color-grey);
  border-radius: 4px;
}

.description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 6rem;

  font-size: var(--font-title);
}

.title {
  color: var(--color-blue);
  font-weight: 700;
}

.result {
  font-size: var(--font-sub-title);
  font-weight: 600;
}

.breakdown {
  width: 48rem;

  margin-top: 10rem;
}

.result-row {
  display: flex;
  align-items: center;

  margin: 1rem 0;
}

.bar {
  background: var(--color-grey);

  height: 0.8rem;
  width: 22rem;

  display: flex;

  border-radius: 3px;

  margin: 0 2rem 0 4rem;
}

.result-text {
  text-align: left;
  font-size: var(--font-sub-title);
  color: #878787;
  font-weight: 500;

  width: 14rem;
}

.left,
.right {
  width: 50%;
  height: 100%;
}

.left {
  border-radius: 3px 0 0 3px;
}

.right {
  border-radius: 0 3px 3px 0;
}

.mbti {
  font-weight: 600;
  color: var(--color-purple);
}

.chosen {
  background: var(--color-purple);
}

@media screen and (min-width: 1024px) {
  .results {
    height: 25rem;

    flex-direction: row;
    justify-content: space-between;

    padding: 0 3rem;
  }

  .breakdown {
    margin-top: 0;
  }
}
</style>
