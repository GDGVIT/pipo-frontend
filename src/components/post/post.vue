<template>
  <div
    class="bg-gray-50 text-gray-800 font-glight p-9 cursor-pointer relative rounded-md"
    @click="openPostModal()"
  >
    <div></div>
    <div class="flex justify-between">
      <div class="flex items-center">
        <span class="text-xl font-gbold">@ {{ post?.username }}</span>
        <span class="streak-btn font-semibold ml-2 text-xs">{{
          post?.points
        }}</span>
      </div>
      <div class="flex items-center">
        <postSVG name="likeLight" />
        <span style="font-size:12px">{{ post?.upvotes?.length }}</span>
      </div>
    </div>
    <div class="">
      <div class="text-2xl font-gbold tracking-wide my-8">
        {{ post?.title }}
      </div>
      <div class="tracking-wider">
        {{ post?.description }}
      </div>
      <div class="flex flex-col justify-items-center mt-5">
        <div v-for="(img, index) in post?.image" :key="index">
          <img :src="img" alt="post-image" />
        </div>
      </div>
      <div class="flex mt-4">
        <div class="tag" v-for="(tag, index) in post?.tags" :key="index">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postSVG from "./postSVG";
import { stringToColor } from "../../generate";
import { computed } from "vue";
import { postModalFn } from "../../composables/posts";

export default {
  components: { postSVG },
  props: ["post", "index"],
  setup(props, { emit }) {
    const { assignIndex } = postModalFn();

    const border = computed(() => {
      return props.post ? stringToColor(props.post.badgeName) : "#fff";
    });

    const openPostModal = () => {
      emit("open", null);
      assignIndex(props.index);
    };

    return { border, openPostModal };
  },
};
</script>
<style scoped></style>
