// import api from "@/api.js";
// import { ref } from "vue";
import { setUser } from "./auth";

// const posts = ref(null);

const getPosts = () => {
  const { config } = setUser();
  console.log(config);

  return { config };
};

export { getPosts };
