<template>
  <button class="submit" @click="$emit('click')" :disabled="loading">
    <slot>
      Save
    </slot>
    <span v-if="loading"
      ><img class="loading-image" src="@/assets/ball-triangle.svg" />
    </span>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseButton",

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="css">
.submit {
  background: var(--color-light-blue);
  color: var(--color-white);
  border-radius: 4px;

  padding: 0.7rem 1.5rem;
  margin: 6rem 0;

  width: 17rem;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  border: none;
  outline: none;
  cursor: pointer;
}

.submit:disabled {
  cursor: not-allowed;
}

.loading-image {
  height: 1.4rem;
  width: 2rem;

  margin-left: 0.4rem;
}
</style>
