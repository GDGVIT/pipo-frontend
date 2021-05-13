<template>
  <div
    @click="$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white z-20 h-4/5 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-3/4 md:m-auto lg:w-2/3 font-glight"
  >
    <div v-if="!isCommentActive" class="relative">
      <div class="absolute top-64">
        <PostSVG
          class="cursor-pointer arrow-bounce"
          @click="prev()"
          name="leftArrow"
        />
      </div>
      <div class="px-14 py-5">
        <!-- middle -->
        <div class="flex justify-between mt-4 items-center scroll hide-scroll">
          <!-- header -->
          <div class="flex justify-start items-center">
            <div class="text-2xl font-gbold">@ {{ postModal?.username }}</div>
            <div class="ml-3 streak-btn">{{ postModal?.points }}</div>
          </div>
          <div class="flex items-center">
            <PostSVG
              class="cursor-pointer"
              @click="upvotePost()"
              :name="upvoted ? 'likeDark' : 'likeLight'"
            />
            <span>{{ postModal?.upvotes.length }}</span>
            <div class="ml-5">
              <PostSVG
                name="comment"
                class="cursor-pointer"
                @click="isCommentActive = true"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-xs text-gray-400 mr-5">
              {{ postModal?.createDate }}
            </div>
            <PostSVG
              style="width:12px"
              class="cursor-pointer enlarge"
              name="close"
              @click="$emit('close', null)"
            />
          </div>
        </div>
        <div>
          <div class="text-2xl my-7 font-gbold tracking-widest text-center">
            {{ postModal?.title }}
          </div>
          <div class="post-body">
            <div class="tracking-wide">
              {{ postModal?.description }}
            </div>
            <div class="flex flex-col justify-items-center">
              <div v-for="(img, index) in postModal?.image" :key="index">
                <img class="w-full mt-10" :src="img" alt="post-image" />
              </div>
            </div>
          </div>

          <div class="flex px-10 mt-3">
            <div
              class="tag"
              v-for="(tag, index) in postModal?.tags"
              :key="index"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-64 right-0">
        <PostSVG
          class="cursor-pointer w-3 arrow-bounce"
          @click="next()"
          name="rightArrow"
        />
      </div>
    </div>

    <!-- Comments -->
    <div v-if="isCommentActive" class="p-10">
      <PostSVG
        class="cursor-pointer absolute top-10 left-10"
        name="leftArrow"
        @click="isCommentActive = false"
      />
      <div class="grid place-items-center">
        <div class="text-2xl font-gbold flex">
          Comments
          <PostSVG name="comment" />
        </div>
      </div>
      <div class="h-96 overflow-y-scroll">
        <div
          v-for="comment in orderedComments"
          :key="comment?.commentId"
          class="grid grid-cols-12 px-5 bg-gray-50 py-3 rounded-md mt-6"
        >
          <!-- Profile -->
          <div class="col-span-2">
            <img
              v-if="comment.photoURL"
              :src="comment.photoURL"
              alt="profile-pic"
            />
            <Icon v-if="!comment.photoURL" name="profileIcon" />
          </div>
          <!-- Comment -->
          <div class="col-span-10 pl-3">
            <div class="flex justify-between items-baseline">
              <div class="text-sm font-gbold">@ {{ comment.userName }}</div>
              <div class="text-xs">{{ comment.createdAt }}</div>
            </div>
            <div class="my-2">{{ comment.comment }}</div>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-10 left-0 right-0 grid grid-cols-12 place-items-center px-10"
      >
        <input
          v-model="userComment"
          class="border-b border-gray-400 col-span-11 w-full px-5 py-2"
          type="text"
          placeholder="write a comment here..."
        />
        <div
          @click="sendComment"
          class="bg-myRed w-10 h-10 rounded-full flex items-center cursor-pointer enlarge"
        >
          <PostSVG name="sendComment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostSVG from "../post/postSVG";
import Icon from "@/components/navbar/navIcons";
import { getComments, postModalFn } from "../../composables/posts";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "../../composables/auth";

export default {
  components: {
    PostSVG,
    Icon,
  },
  emits: ["close"],
  setup() {
    const postModal = ref(null);
    const upvoted = ref(false);
    const isCommentActive = ref(false);
    const { user } = setUser();
    const userComment = ref(null);

    const { getCurrentPost, getNextPost, getPrevPost, vote } = postModalFn();
    const { loadComments, orderedComments, postComment } = getComments();

    postModal.value = getCurrentPost();
    onMounted(() => checkUpvoted());

    //Shift
    const next = () => {
      upvoted.value = false;
      postModal.value = getNextPost();
      checkUpvoted();
    };

    const prev = () => {
      upvoted.value = false;
      postModal.value = getPrevPost();
      checkUpvoted();
    };

    //Upvotes section
    const checkUpvoted = () => {
      postModal.value.upvotes.forEach((u) => {
        if (u === user.userId) {
          upvoted.value = true;
        }
      });
    };

    const upvotePost = () => {
      vote();
      upvoted.value = !upvoted.value;
    };

    // Comments section
    watchEffect(async () => {
      if (postModal.value) {
        await loadComments();
      }
    });

    const sendComment = () => {
      postComment(userComment.value);
      userComment.value = null;
    };

    return {
      postModal,
      next,
      prev,
      upvoted,
      upvotePost,
      orderedComments,
      isCommentActive,
      userComment,
      sendComment,
    };
  },
};
</script>

<style scoped>
.arrow-bounce {
  animation: arrow-bounce 1.5s infinite;
}

.post-body {
  padding: 0 40px;
  overflow: scroll;
  height: 350px;
}

@keyframes arrow-bounce {
  0%,
  100% {
    transform: translateX(-25%);
    animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateX(0);
    animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
