<template>
  <div
    :class="[
      isMyLatestPost ? 'bg-myRed' : 'bg-white',
      'grid grid-rows-4 w-full m-auto h-l3 rounded-md px-10 py-10',
    ]"
  >
    <div class="flex justify-between items-start">
      <div
        :class="[
          isMyLatestPost ? 'bg-red-200' : 'bg-gray-200',
          'w-16 h-16 rounded-full animate-pulse mr-2',
        ]"
      ></div>
      <div class="w-1/2">
        <div
          :class="[
            isMyLatestPost ? 'bg-red-200' : 'bg-gray-200',
            'w-full h-6 my-1 rounded-md animate-pulse',
          ]"
        ></div>
        <div
          :class="[
            isMyLatestPost ? 'bg-red-200' : 'bg-gray-200',
            'w-2/3 h-3 mt-2 my-1 rounded-md animate-pulse',
          ]"
        ></div>
      </div>
      <div
        :class="[
          isMyLatestPost ? 'bg-red-200' : 'bg-gray-200',
          'w-7 h-7 ml-2 rounded-full',
        ]"
      ></div>
    </div>
    <div>
      <div
        :class="[
          isMyLatestPost ? 'bg-red-200' : 'bg-gray-200',
          'h-5 w-3/5 mx-auto mt-auto rounded-lg animate-pulse',
        ]"
      ></div>
      <div
        :class="[
          isMyLatestPost ? 'bg-red-200' : 'bg-gray-200',
          'w-5/6 h-60 mx-auto mt-10 animate-pulse rounded-lg',
        ]"
      ></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { resizing } from "@/composables/posts";
export default {
  props: ["masonry", "isLatestPost"],
  setup(props) {
    const { resizeGridItem } = resizing();
    const isMyLatestPost = ref(false);

    onMounted(() => {
      isMyLatestPost.value = props.isLatestPost ? props.isLatestPost : false;
      resizeGridItem(props.masonry);
    });

    return { isMyLatestPost };
  },
};
</script>

<style></style>
