<template>
  <div id="app">
    <Menu />
    <div class="page-container">
      <transition name="slide-left-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Menu from "@/components/Menu.vue";

export default Vue.extend({
  components: { Menu }
});
</script>

<style lang="css">
:root {
  --color-red: #fa4344;
  --color-light-blue: #3d59fa;
  --color-purple: #a920cb;
  --color-green: #00a079;
  --color-blue: #113264;
  --color-black: #495057;
  --color-grey: #e5e5e5;
  --color-white: #ffffff;
  --box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.1);
  --font-title: 2.2rem;
  --font-sub-title: 1.6rem;
}

html {
  box-sizing: border-box;
  /* // broweser default = 16px
  // 10px / 16px = 62.5%
  // so that 10px = 1rem */
  font-size: 62.5%;
}

* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  height: 100vh;
  width: 100%;

  font-family: Roboto;
  --webkit-font-smoothing: antialiased;
}

.page-container {
  width: 100%;

  padding: 5rem 2rem;
}

.error {
  border: 1.5px solid var(--color-red);
}

.slide-left-fade-enter {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-fade-enter-active,
.slide-left-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-left-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.questions {
  width: 100%;
  margin: 5rem auto;

  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 992px) {
  .page-container {
    width: 100%;

    padding: 8rem 10rem;
  }

  .questions {
    width: 70%;
    padding: 0 1rem;
  }

  .email-input {
    width: 60%;
  }
}

.email-error {
  color: var(--color-red);
  font-size: 1.3rem;

  height: 1rem;
}

.email-text {
  font-size: var(--font-sub-title);
  font-style: normal;
  font-weight: bold;
}

.email-input {
  background: var(--color-white);
  box-sizing: border-box;
  outline: none;

  border: 1.3px solid #aaaaaa;
  border-radius: 4px;

  width: 100%;

  padding: 1rem 1.5rem;
  margin-bottom: 0.1rem;
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

.error-block {
  color: var(--color-white);
  opacity: 0.7;
  background: var(--color-purple);
  border-radius: 4px;

  position: absolute;
  right: 0;
  bottom: 0;

  font-size: 12px;

  padding: 5px;
}
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

@media screen and (min-width: 1024px) {
  .questions {
    width: 60%;
    padding: 0 1rem;
  }

  .error-block {
    right: -30rem;
    top: 4rem;
    bottom: unset;

    padding: 10px;
  }
}

@media screen and (min-width: 1440px) {
  .questions {
    width: 55%;
  }
}
</style>
