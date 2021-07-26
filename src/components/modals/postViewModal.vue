<template>
  <div
    @click="$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 "
  />
  <div
    class="postViewModal fixed bg-white text-black z-20 h-5/6 top-24 left-0 right-0 sm:left-10 sm:right-10 md:w-3/4 md:m-auto lg:w-2/3 font-glight"
  >
    <div v-if="!isCommentActive" class="relative">
      <div class="absolute top-64 left-5 arrow-bounce" @click="prev()">
        <PostSVG name="leftArrow" />
      </div>
      <div class="py-5">
        <!-- middle -->
        <div class="flex justify-between mt-4 items-center mx-5 md:mx-10">
          <!-- header -->
          <router-link
            :to="{
              name: 'randomUserPosts',
              params: {
                userId: `${postModal?.userId}`,
              },
            }"
          >
            <div class="flex justify-start items-center">
              <img
                v-if="postModal?.picture"
                :src="postModal?.picture"
                class="w-14 h-14 rounded-full mr-4"
                alt="profile"
                referrerpolicy="no-referrer"
              />
              <div>
                <div
                  :class="[
                    !postModal?.picture ? 'inline-block mr-4' : '',
                    'text-xl font-gbold',
                  ]"
                >
                  @{{ postModal?.username }}
                </div>
                <div
                  v-if="postModal?.points"
                  class="text-xs bg-myRed text-white font-gbold px-2 rounded-full inline-block"
                >
                  {{ postModal?.points }} pts
                </div>
              </div>
            </div>
          </router-link>
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
        <div class="text-center mt-2">
          <!-- title -->
          <div
            class="text-xl sm:text-2xl break-words mb-7 font-gbold text-center px-10"
          >
            {{ postModal?.title }}
          </div>
          <div
            :class="[
              postModal?.image?.length > 0 ? 'xl:grid-cols-3' : '',
              'h-96 overflow-y-auto grid px-20',
            ]"
          >
            <!-- Images -->
            <div
              v-if="postModal?.image?.length > 0"
              class="grid justify-center items-start xl:col-span-2"
            >
              <div v-for="(img, index) in postModal?.image" :key="index">
                <img class="post-image" :src="img" alt="post-image" />
              </div>
            </div>
            <!-- content -->
            <div class="sm:px-8">
              {{ postModal?.description }}
            </div>
          </div>
        </div>

        <!-- Tags and update and delete -->
        <div class="grid grid-cols-12 items-center">
          <!-- tags -->
          <div class="flex py-2 h-10 overflow-y-auto mt-1 mx-12 col-span-10">
            <div
              class="text-xs text-myBlue font-gbold px-3 py-1 rounded-md mr-2 cursor-pointer"
              v-for="(tag, index) in postModal?.tags"
              @click="searchTag(tag + ' ')"
              :key="index"
            >
              # {{ tag }}
            </div>
          </div>
          <!-- update and delete -->
          <Popper
            :hover="true"
            placement="top"
            @click="update()"
            v-if="isMyPosts"
          >
            <button class="text-myBlue">
              <UserIcon name="editPencil" />
            </button>
            <template #content>
              <div
                class="w-24 font-glight text-xs bg-myBlue text-white p-2 break-normal rounded-md text-center"
              >
                Update Post
              </div>
            </template>
          </Popper>
          <div @click="showDeleteModal = true" v-if="isMyPosts">
            <Popper :hover="true" placement="top">
              <button class="text-myBlue">
                <UserIcon name="bin" />
              </button>
              <template #content>
                <div
                  class="w-24 font-glight absolute -top-6 -left-12 text-xs bg-myBlue text-white p-2 break-normal rounded-md text-center"
                >
                  Delete Post
                </div>
              </template>
            </Popper>
          </div>
        </div>
      </div>
      <div class="absolute top-64 right-5 arrow-bounce" @click="next()">
        <PostSVG name="rightArrow" />
      </div>
    </div>

    <!-- Comments -->
    <div v-if="isCommentActive" class="p-10">
      <div class="absolute top-11 left-5" @click="isCommentActive = false">
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
          v-for="(comment, index) in orderedComments"
          :key="comment?.commentId"
          data-aos="fade-right"
          :data-aos-delay="index * 100"
          class="grid grid-cols-12 px-3 border-2 border-myBlue py-3 rounded-md mt-6"
        >
          <!-- Profile -->
          <div
            class="hidden sm:col-span-2 lg:col-span-1 sm:grid sm:place-items-center"
          >
            <img
              v-if="comment.picture"
              :src="comment.picture"
              alt="profile-pic"
              class="w-14 h-14 rounded-full"
            />
            <Icon v-if="!comment.picture" name="profileIcon" />
          </div>
          <!-- Comment -->
          <div class="col-span-full sm:col-span-10 lg:col-span-11 pl-3">
            <div class="flex justify-between items-baseline">
              <div class="text-sm font-gbold whitespace-nowrap">
                @ {{ comment.userName }}
              </div>
              <div class="text-xs">{{ comment.createdAt }}</div>
            </div>
            <div class="flex justify-between items-center">
              <div v-if="!showUpdateComment">{{ comment.comment }}</div>
              <div v-else class="relative w-full pr-4 sm:flex">
                <input
                  type="text"
                  v-model="newComment"
                  spellcheck="false"
                  class="border-b-2 w-full focus:outline-none"
                />
                <div class="flex items-center gap-x-4">
                  <div
                    @click="updateCom(comment.commentId, newComment)"
                    class="cursor-pointer w-6 h-6 text-myBlue"
                  >
                    <UserIcon name="tick" />
                  </div>
                  <div
                    @click="showUpdateComment = false"
                    class="cursor-pointer text-xs text-myBlue"
                  >
                    Close
                  </div>
                </div>
              </div>
              <div
                class="flex items-center mt-2"
                v-if="comment.userName === user.userName"
              >
                <div @click="deleteComment(comment.commentId)">
                  <Popper :hover="true" placement="bottom">
                    <button class="text-myBlue">
                      <UserIcon name="bin" />
                    </button>
                    <template #content>
                      <div
                        class="w-28 font-glight relative -top-5 text-xs bg-myBlue text-white p-2 break-normal rounded-md text-center"
                      >
                        Delete Comment
                      </div>
                    </template>
                  </Popper>
                </div>
                <Popper
                  :hover="true"
                  placement="bottom"
                  @click="showUpdateComment = true"
                >
                  <button class="text-myBlue">
                    <UserIcon name="editPencil" />
                  </button>
                  <template #content>
                    <div
                      class="w-32 relative -top-3 font-glight text-xs bg-myBlue text-white p-2 break-normal rounded-md text-center"
                    >
                      Update Comment
                    </div>
                  </template>
                </Popper>
              </div>
            </div>
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
          @keydown.enter="sendComment"
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
  <UpdateModal
    @closeModal="close()"
    @updated="$emit('confetti', null)"
    v-if="showUpdateModal"
  />

  <InfoModal
    @close="showDeleteModal = false"
    @delete="del()"
    v-if="showDeleteModal"
    modal="deleteConfirmation"
  />
</template>

<script>
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import anime from "animejs/lib/anime.es.js";
import UpdateModal from "./updateModal.vue";
import InfoModal from "./infoModal.vue";
import PostSVG from "@/components/post/postSVG";
import UserIcon from "@/components/user/userIcons.vue";
import Icon from "@/components/navbar/navIcons";
import { getComments, postModalFn } from "@/composables/posts";
import { focusSearch, fuzzySearch } from "@/composables/fuzzySearch";
import { setUser } from "@/composables/auth";
import { useRoute } from "vue-router";

export default {
  components: {
    PostSVG,
    Icon,
    UpdateModal,
    InfoModal,
    UserIcon,
  },
  emits: ["close", "confetti"],
  setup(props, { emit }) {
    const postModal = ref(null);
    const upvoted = ref(false);
    const isCommentActive = ref(false);
    const { isLoggedIn, user } = setUser();
    const userComment = ref(null);
    const showUpdateModal = ref(false);
    const showDeleteModal = ref(false);
    const showUpdateComment = ref(false);
    const isMyPosts = ref(false);
    const route = useRoute();
    const { updateShouldFocusSearch } = focusSearch();

    const {
      getCurrentPost,
      getNextPost,
      getPrevPost,
      vote,
      deletePost,
    } = postModalFn();
    const { query, performSearch, fixSearch } = fuzzySearch();
    const {
      loadComments,
      orderedComments,
      postComment,
      updateComment,
      deleteComment,
    } = getComments();

    onMounted(() => {
      anime({
        targets: ".postViewModal",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
      updateShouldFocusSearch(false);
    });

    watchEffect(() => {
      if (isLoggedIn.value) {
        postModal.value = getCurrentPost.value;
        if (postModal.value?.upvotes.includes(user.value.userId)) {
          upvoted.value = true;
        }
        if (route.name === "myPosts") isMyPosts.value = true;
      }
    });

    const searchTag = (tag) => {
      query.value = tag;
      performSearch();
      fixSearch();
      emit("close", null);
    };

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

    const updateCom = (commentId, comment) => {
      updateComment(commentId, comment);
      showUpdateComment.value = false;
    };

    onBeforeUnmount(() => updateShouldFocusSearch(true));

    // close
    const close = () => {
      showUpdateModal.value = false;
      emit("close", null);
    };

    return {
      postModal,
      next,
      prev,
      upvoted,
      upvotePost,
      orderedComments,
      updateCom,
      deleteComment,
      isCommentActive,
      userComment,
      sendComment,
      showUpdateComment,
      showUpdateModal,
      showDeleteModal,
      update,
      del,
      isMyPosts,
      close,
      searchTag,
      user,
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
