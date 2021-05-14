<template>
  <div
    @click="$emit('closeModal')"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white p-14 h-4/5 z-20 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight overflow-y-auto"
  >
    <span
      @click="$emit('closeModal')"
      class="absolute top-16 right-16 cursor-pointer"
      >x</span
    >
    <div>
      <div class="text-3xl font-gbold text-center">Add a Post</div>
      <div class="my-6">
        Record your experience with people around the world!. Select the
        challenge you wish to conquer!. Along with that enter the title,
        description and atleast one image of your work. Be creative with your
        words. As most upvoted posts get to be in the main page!
      </div>
    </div>
    <div>
      <div class="grid sm:grid-cols-4 gap-4 md:px-10 items-center">
        <label for="challenge">Challenge</label>
        <div class="col-span-3 relative">
          <input
            type="text"
            v-model="challengeTyped"
            class="input-border pl-4 py-1 focus:outline-none font-gregular"
            placeholder="Search"
          />
          <ul
            class="absolute w-full top-10 overflow-y-auto max-h-32 bg-gray-50 rounded-sm border border-gray-200 transition-transform"
          >
            <li
              class="pl-4 py-2 font-gregular text-sm cursor-pointer hover:bg-gray-200"
              v-for="(challenge, index) in updatedChallenges"
              :key="index"
              @click="submitChallenge(challenge)"
            >
              {{ challenge }}
            </li>
          </ul>
        </div>
        <label for="title">Title</label>
        <input
          class="input-border col-span-3"
          type="text"
          name="title"
          id="title"
          v-model="title"
        />
        <label for="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          class="input-border resize-none col-span-3"
          style="height:10em"
          v-model="description"
        />
        <label for="tags">Tags</label>
        <input
          type="text"
          class="input-border col-span-3"
          name="tags"
          v-model="tag"
          @keydown="addTag"
        />
      </div>

      <!-- Tags display -->
      <div class="mt-10 md:px-10">
        <div
          v-for="(t, index) in tags"
          :key="index"
          class="font-gregular bg-myBlue text-white inline-block rounded-md px-2 mr-3"
        >
          {{ t }}
          <span
            class="cursor-pointer ml-2 font-gregular"
            @click="tags.splice(index, 1)"
            >x</span
          >
        </div>
      </div>

      <div class="mt-10 my-4 md:px-10 flex">
        <div class="font-gbold mr-3">Add Images</div>
        <div class="relative flex">
          <label for="img">
            <ModalSVG name="imageIcon" />
          </label>
          <div
            v-if="imageFile"
            class="bg-myBlue text-white px-2 py-1 text-xs ml-4 rounded-md"
          >
            {{ imageFile.name }}
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
      <div class="text-center">
        <button
          @click="onSubmit()"
          class="tracking-widest text-sm font-gbold bg-myRed px-3 py-2 text-white"
          type="submit"
        >
          POST
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalSVG from "./modalSVG";
import { getBadges } from "../../composables/badges";
import { onMounted, ref, watch } from "vue";
import { addPostFn } from "../../composables/posts";

export default {
  components: { ModalSVG },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const { getAllBadges } = getBadges();
    const challenges = ref([]);
    const updatedChallenges = ref([]);
    const challengeTyped = ref(null);

    const title = ref(null);
    const description = ref(null);
    const tag = ref("");
    const selectedChallenge = ref(null);
    const imageFile = ref(null);

    const tags = ref([]);

    onMounted(() => {
      challenges.value = getAllBadges();
    });

    watch(challengeTyped, () => {
      updatedChallenges.value = challenges.value.filter((badge) =>
        badge.toLowerCase().includes(challengeTyped.value?.toLowerCase())
      );
    });

    document.addEventListener("click", () => {
      updatedChallenges.value = [];
    });

    const addTag = (event) => {
      if (event.which === 13) {
        tags.value.push(tag.value);
        tag.value = "";
      }
    };

    const onSelectImage = (event) => {
      imageFile.value = event.target.files[0];
      console.log("image", imageFile.value);
    };

    const submitChallenge = (challenge) => {
      selectedChallenge.value = challenge;
      challengeTyped.value = challenge;
      updatedChallenges.value = [];
    };

    const onSubmit = () => {
      addPostFn({
        title: title.value,
        badgeName: selectedChallenge.value,
        description: description.value,
        post: imageFile.value,
        tags: tags.value,
      });
      emit("closeModal", null);
    };

    return {
      title,
      tags,
      tag,
      addTag,
      description,
      challengeTyped,
      updatedChallenges,
      imageFile,
      submitChallenge,
      onSelectImage,
      onSubmit,
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
