<template>
  <!-- Display Loading Card -->
  <div v-if="!post">
    <LoadingCard :masonry="masonry" />
  </div>
  <div
    v-else
    :id="post.postId"
    class="bg-gray-50 text-gray-800 font-glight p-9 pb-6 cursor-pointer relative sm:rounded-md"
    @click="openPostModal()"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <img
          v-if="post.picture"
          :src="post?.picture"
          class="w-14 h-14 rounded-full mr-4"
          alt="profile"
          referrerpolicy="no-referrer"
        />
        <div>
          <div
            :class="[
              !post.picture ? 'inline-block mr-4' : '',
              'text-xl font-gbold',
            ]"
          >
            @ {{ post?.username }}
          </div>
          <div class="streak-btn font-semibold text-xs inline-block">
            {{ post?.points }} pts
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <postSVG name="likeLight" />
        <span style="font-size:12px">{{ post?.upvotes?.length }}</span>
      </div>
    </div>
    <div v-if="post">
      <div class="text-2xl font-gbold tracking-wide my-8">
        {{ post?.title }}
      </div>
      <div class="tracking-wider">
        {{ post?.description }}
      </div>
      <div class="grid place-items-center mt-5">
        <div v-for="(img, index) in post?.image" :key="index">
          <img
            class="w-full"
            :src="img"
            alt="post-image"
            @load="resizeGridItem(masonry)"
          />
        </div>
      </div>
      <div class="flex mt-4">
        <div
          class="text-myBlue border-2 text-sm border-myBlue mr-2 px-3 font-gbold rounded-md"
          v-for="(tag, index) in post?.tags"
          :key="index"
        >
          # {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postSVG from "./postSVG";
import { postModalFn, resizing } from "../../composables/posts";
import LoadingCard from "@/components/loadComponents/LoadingCard";

export default {
  components: { postSVG, LoadingCard },
  props: ["post", "index", "masonry"],
  setup(props, { emit }) {
    const { assignIndex } = postModalFn();
    const { resizeGridItem } = resizing();

    const openPostModal = () => {
      emit("open", null);
      assignIndex(props.index);
    };

    return { openPostModal, resizeGridItem };
  },
};
</script>
<style scoped></style>
