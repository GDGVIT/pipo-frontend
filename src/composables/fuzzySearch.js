import { readonly, ref, watch } from "vue";
import { useRoute } from "vue-router";

const shouldFocus = ref(true);

const focusSearch = () => {
  const route = useRoute();

  const focus = readonly(shouldFocus);

  const updateShouldFocusSearch = (bool) => {
    shouldFocus.value = bool;
  };

  watch(
    () => route.name,
    () => {
      const routeName = route.name;

      if (
        routeName === "generalPosts" ||
        routeName === "myPosts" ||
        routeName === "randomUserPosts" ||
        routeName === "home"
      ) {
        shouldFocus.value = true;
      } else {
        shouldFocus.value = false;
      }
    }
  );

  return { focus, updateShouldFocusSearch };
};

export { focusSearch };
