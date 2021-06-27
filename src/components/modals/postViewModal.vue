<template>
  <div
    @click="$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white text-black z-20 h-5/6 top-24 left-0 right-0 sm:left-10 sm:right-10 md:w-3/4 md:m-auto lg:w-2/3 font-glight"
  >
    <div v-if="!isCommentActive" class="relative">
      <div class="absolute top-64 left-5 arrow-bounce" @click="prev()">
        <PostSVG name="leftArrow" />
      </div>
      <div class="py-5">
        <!-- middle -->
        <div class="flex justify-between mt-4 items-center mx-5 md:mx-10">
          <!-- header -->
          <div class="flex justify-start items-center">
            <div class="text-lg font-gbold">
              <router-link
                :to="{
                  name: 'randomUserPosts',
                  params: {
                    userId: `${postModal?.userId}`,
                  },
                }"
                >@{{ postModal?.username }}</router-link
              >
            </div>
            <div
              v-if="postModal?.points"
              class="ml-3 text-xs bg-myRed text-white font-gbold px-2 rounded-full py-1"
            >
              {{ postModal?.points }} pts
            </div>
          </div>
          <div class="flex">
            <!-- Upvote and Comment -->
            <div class="flex items-center">
              <div @click="upvotePost()">
                <PostSVG :name="upvoted ? 'likeDark' : 'likeLight'" />
              </div>

              <span>{{ postModal?.upvotes.length }}</span>
              <div class="ml-2" @click="isCommentActive = true">
                <PostSVG name="comment" />
              </div>
            </div>
            <!-- Date and close -->
            <div class="flex items-center">
              <div class="text-xs text-gray-400 px-3 hidden md:block">
                {{ postModal?.createDate }}
              </div>
              <div @click="$emit('close', null)">
                <PostSVG name="close" />
              </div>
            </div>
          </div>
        </div>
        <!-- Post Content -->
        <div class="text-center mt-4">
          <!-- title -->
          <div class="text-2xl break-words my-7 font-gbold text-center px-10">
            {{ postModal?.title }}
          </div>
          <div
            :class="[
              postModal?.image?.length > 0 ? 'xl:grid-cols-3' : '',
              'h-l1 overflow-y-auto grid px-20',
            ]"
          >
            <!-- Images -->
            <div
              v-if="postModal?.image?.length > 0"
              class="grid place-items-center xl:col-span-2"
            >
              <div v-for="(img, index) in postModal?.image" :key="index">
                <img class="post-image" :src="img" alt="post-image" />
              </div>
            </div>
            <!-- content -->
            <div class="px-8">
              {{ postModal?.description }}
            </div>
          </div>
        </div>

        <!-- Tags and update and delete -->
        <div class="grid grid-cols-12 items-center">
          <!-- tags -->
          <div class="flex py-2 h-10 overflow-y-auto mt-1 mx-12 col-span-10">
            <div
              class="text-xs bg-myBlue text-white font-gbold px-3 py-1 rounded-md mr-2"
              v-for="(tag, index) in postModal?.tags"
              :key="index"
            >
              {{ tag }}
            </div>
          </div>
          <!-- update and delete -->
          <div @click="update()" v-if="isMyPosts" class="text-myBlue">
            <UserIcon name="editPencil" />
          </div>
          <div
            @click="showDeleteModal = true"
            v-if="isMyPosts"
            class="text-myBlue"
          >
            <UserIcon name="bin" />
          </div>
        </div>
      </div>
      <div class="absolute top-64 right-5 arrow-bounce" @click="next()">
        <PostSVG name="rightArrow" />
      </div>
    </div>

    <!-- Comments -->
    <div v-if="isCommentActive" class="p-10">
      <div
        class="absolute top-10 left-10 arrow-bounce"
        @click="isCommentActive = false"
      >
        <PostSVG name="leftArrow" />
      </div>
      <div class="grid place-items-center">
        <div class="text-2xl font-gbold flex">
          Comments
          <PostSVG name="comment" />
        </div>
      </div>
      <div class="h-96 px-2 overflow-y-scroll">
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

  <!-- Update modal to update the post -->
  <UpdateModal @closeModal="showUpdateModal = false" v-if="showUpdateModal" />

  <InfoModal
    @close="showDeleteModal = false"
    @delete="del()"
    v-if="showDeleteModal"
    modal="deleteConfirmation"
  />
</template>

<script>
import UpdateModal from "./updateModal.vue";
import InfoModal from "./infoModal.vue";
import PostSVG from "../post/postSVG";
import UserIcon from "../user/userIcons.vue";
import Icon from "@/components/navbar/navIcons";
import { getComments, postModalFn } from "../../composables/posts";
import { ref, watchEffect } from "vue";
import { setUser } from "../../composables/auth";
import { useRoute } from "vue-router";

export default {
  components: {
    PostSVG,
    Icon,
    UpdateModal,
    InfoModal,
    UserIcon,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const postModal = ref(null);
    const upvoted = ref(false);
    const isCommentActive = ref(false);
    const { isLoggedIn, user } = setUser();
    const userComment = ref(null);
    const showUpdateModal = ref(false);
    const showDeleteModal = ref(false);
    const isMyPosts = ref(false);
    const route = useRoute();

    const {
      getCurrentPost,
      getNextPost,
      getPrevPost,
      vote,
      deletePost,
    } = postModalFn();
    const { loadComments, orderedComments, postComment } = getComments();

    watchEffect(() => {
      if (isLoggedIn.value) {
        postModal.value = getCurrentPost.value;
        if (postModal.value?.upvotes.includes(user.value.userId)) {
          upvoted.value = true;
        }
        if (route.name === "myPosts") isMyPosts.value = true;
      }
    });

    //update
    const update = () => (showUpdateModal.value = true);

    //delete
    const del = async () => {
      await deletePost(postModal.value?.postId);
      emit("close", null);
    };

    //Shift
    const next = () => {
      upvoted.value = false;
      postModal.value = getNextPost();
    };

    const prev = () => {
      upvoted.value = false;
      postModal.value = getPrevPost();
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
      showUpdateModal,
      showDeleteModal,
      update,
      del,
      isMyPosts,
    };
  },
};
</script>

<style scoped>
.arrow-bounce {
  animation: arrow-bounce 1.5s infinite;
}

::-webkit-scrollbar {
  background-color: white;
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(204, 204, 204);
  border-radius: 20px;
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
