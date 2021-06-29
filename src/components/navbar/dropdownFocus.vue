<template>
  <div></div>
</template>

<script>
import { onBeforeUnmount } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { focusSearch } from "../../composables/fuzzySearch";
export default {
  setup(props, { emit }) {
    const route = useRoute();
    const { focus } = focusSearch();

    const handler = (event) => {
      const routeName = route.name;

      if (
        focus.value &&
        (routeName === "generalPosts" ||
          routeName === "myPosts" ||
          routeName === "randomUserPosts")
      ) {
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
