<template>
  <div id="app">
    <router-view />
  </div>
</template>

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

.error {
  border: 1.5px solid var(--color-red);
}
</style>
