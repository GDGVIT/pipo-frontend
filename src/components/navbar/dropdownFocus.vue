<template>
  <div></div>
</template>

<script>
import { onBeforeUnmount } from "@vue/runtime-core";
import { focusSearch } from "@/composables/fuzzySearch";
export default {
  setup(props, { emit }) {
    const { focus } = focusSearch();

    const handler = (event) => {
      if (focus.value) {
        emit("keyup", event);
      }
    };

    window.addEventListener("keyup", handler);

    onBeforeUnmount(() => window.removeEventListener("keyup", handler));
  },
};
</script>

<style scoped>
div {
  display: none;
}
</style>
