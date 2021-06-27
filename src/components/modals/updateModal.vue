<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 backdrop-filter backdrop-blur-3xl"
  />
  <!-- Confetti background -->
  <canvas
    id="confetti-holder"
    @click="$emit('closeModal')"
    class="fixed top-0 w-full h-full z-20"
  />
  <div
    class="fixed bg-white p-14 h-4/5 z-30 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight overflow-y-auto"
  >
    <span
      @click="$emit('closeModal')"
      class="absolute top-16 right-16 cursor-pointer"
    >
      <Icon name="close" />
    </span>
    <div>
      <div class="text-3xl font-gbold flex items-center mb-10">
        <span>Update Post</span>
        <div @click="showInfo = true">
          <Icon name="info" />
        </div>
      </div>
    </div>
    <div>
      <div class="grid sm:grid-cols-4 gap-4 md:px-10 items-center">
        <label for="challenge">Challenge Selected</label>
        <div class="col-span-3 relative">
          <input
            id="challengeInput"
            type="text"
            autocomplete="off"
            class="input-border pl-4 py-1 focus:outline-none font-gregular"
            placeholder="Search"
            :value="post?.badgeName"
            readonly
          />
        </div>
        <label for="title">Title</label>
        <input
          class="input-border col-span-3"
          type="text"
          name="title"
          id="title"
          autocomplete="off"
          v-model="post.title"
        />
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          class="input-border resize-none col-span-3"
          style="height:10em"
          autocomplete="off"
          v-model="post.description"
        />
        <label for="tags">Tags</label>
        <input
          type="text"
          class="input-border col-span-3"
          name="tags"
          autocomplete="off"
          v-model="tag"
          @keydown.enter="addTag()"
        />
      </div>

      <!-- Tags display -->
      <div class="mt-10 md:px-10">
        <div
          v-for="(t, index) in post.tags"
          :key="index"
          class="bg-myBlue text-white font-gbold inline-block rounded-md pl-3 py-1 mr-3"
        >
          <div class="flex items-center">
            <span>{{ t }}</span>
            <span
              class="cursor-pointer font-glight"
              @click="post.tags.splice(index, 1)"
            >
              <Icon name="close" />
            </span>
          </div>
        </div>
      </div>

      <div class="mt-10 my-4 md:px-10 flex">
        <div class="font-gbold mr-3">Add Images</div>
        <div class="relative flex">
          <label
            for="img"
            class="bg-myRed flex items-center px-3 rounded-sm cursor-pointer"
          >
            <ModalSVG name="imageIcon" />
            <span class="text-xs text-white">Image +</span>
          </label>
          <div
            v-if="post.post.name"
            class="bg-myBlue text-white px-2 py-1 text-xs ml-4 rounded-md"
          >
            {{ post.post.name }}
          </div>
          <input
            @change="onSelectImage"
            type="file"
            id="img"
            name="img"
            accept="image/*"
          />
        </div>
      </div>
      <div v-if="!confirmation" class="text-center mt-10">
        <button
          @click="confirmation = true"
          class="tracking-widest text-sm font-gbold text-myRed px-3 py-2 border-2 border-myRed rounded-full"
          type="submit"
        >
          UPDATE
        </button>
      </div>
      <div v-if="confirmation" class="text-center mt-10">
        <div class="font-gbold text-myRed">Should I Update?</div>
        <div class="mb-6 text-xs text-gray-500">
          Don't worry you can update your posts as many times as you want.
        </div>
        <div class="flex justify-center gap-10 font-gbold">
          <div>
            <button
              @click="onSubmit()"
              class="text-myBlue border-2 border-myBlue p-2 rounded-md"
            >
              Yes
            </button>
          </div>
          <div class="text-myRed border-2 border-myRed p-2 rounded-md">
            <button @click="confirmation = false">
              No Wait
            </button>
          </div>
        </div>
      </div>

      <!-- Info modal for update post -->
      <InfoModal
        @close="showInfo = false"
        v-if="showInfo"
        modal="updatePostInfo"
      />
    </div>
  </div>
</template>

<script>
import ModalSVG from "./modalSVG";
import ConfettiGenerator from "confetti-js";
import Icon from "../post/postSVG";
import { onBeforeUnmount, reactive, ref, watchEffect } from "vue";
import { addPostFn, postModalFn } from "../../composables/posts";
import InfoModal from "../../components/modals/infoModal";
import { useToast } from "vue-toastification";

export default {
  components: { ModalSVG, Icon, InfoModal },
  emits: ["closeModal"],
  setup() {
    const confirmation = ref(false);
    const showInfo = ref(false);
    const toast = useToast();

    const tag = ref("");
    const { getCurrentPost } = postModalFn();

    const post = reactive({
      title: null,
      description: null,
      badgeName: null,
      post: null,
      tags: [],
      postId: null,
    });

    watchEffect(() => {
      if (getCurrentPost.value) {
        const p = getCurrentPost.value;
        post.title = p.title;
        post.description = p.description;
        post.badgeName = p.badgeName;
        post.post = p.image[0];
        post.tags = p.tags;
        post.postId = p.postId;
      }
    });

    let confetti = null;

    const addTag = () => {
      post.tags.push(tag.value);
      tag.value = "";
    };

    const onSelectImage = (event) => {
      post.post = event.target.files[0];
    };

    const onSubmit = async () => {
      const res = await addPostFn(post, "PATCH");

      const confettiSettings = {
        target: "confetti-holder",
        max: 160,
        rotate: true,
      };

      if (res === 0) {
        confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        toast.success("Post updated!🥳. Refresh the page to see the changes");
      }
    };

    onBeforeUnmount(() => confetti?.clear());

    return {
      tag,
      addTag,
      confirmation,
      post,
      onSelectImage,
      onSubmit,
      showInfo,
    };
  },
};
</script>
<style scoped>
.hide-scroll {
  overflow: scroll;
}

.hide-scroll::-webkit-scrollbar {
  display: none;
}

input,
select,
textarea {
  border-radius: 3px;
  padding: 5px 10px;
}

label {
  font-family: Gilroy-ExtraBold;
}

input[type="file"] {
  display: none;
}
</style>
