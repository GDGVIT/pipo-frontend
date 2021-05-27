<template>
  <div
    class="grid grid-rows-4 w-full m-auto h-l3 bg-myRed rounded-md px-10 py-10"
  >
    <div class="flex justify-between items-start">
      <div class="w-16 h-16 bg-red-200 rounded-full animate-pulse mr-2"></div>
      <div class="w-1/2">
        <div class="w-full h-6 my-1 bg-red-200 rounded-md animate-pulse"></div>
        <div
          class="w-2/3 h-3 mt-2 my-1 bg-red-200 rounded-md animate-pulse"
        ></div>
      </div>
      <div class="w-7 h-7 ml-2 bg-red-200 rounded-full"></div>
    </div>
    <div>
      <div
        class="h-5 w-3/5 mx-auto mt-auto bg-red-200 rounded-lg animate-pulse"
      ></div>
      <div
        class="w-5/6 h-60 mx-auto mt-10 bg-red-200 animate-pulse rounded-lg"
      ></div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { resizing } from "../../composables/posts";
export default {
  props: ["masonry"],
  setup(props) {
    const { resizeGridItem } = resizing();
    onMounted(() => {
      resizeGridItem(props.masonry);
    });
  },
};
</script>

<style></style>
