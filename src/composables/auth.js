import { ref } from "vue";

const setUser = () => {
  const user = ref(null);

  return { user };
};

return { setUser };
