<template>
  <div class="app-menu">
    <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
    <router-link :to="{ name: 'CheckResult' }" class="link"
      >Check MBTI</router-link
    >
  </div>
</template>

<style lang="css" scoped>
.app-menu {
  width: 100%;

  padding-right: 3rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 6.2rem;

  box-shadow: var(--box-shadow);
}

.link {
  margin: 0 1.5rem;

  color: var(--color-blue);

  font-size: var(--font-sub-title);
  font-weight: 600;

  text-decoration: none;
}

.link:hover {
  border-bottom: 1px solid currentColor;
}
</style>
