import { ref } from "vue";

const generalFilter = ref("All Badges");
const myPostsFilter = ref("All Badges");

const filter = () => {
  return { generalFilter, myPostsFilter };
};

export { filter };
