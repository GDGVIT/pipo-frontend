<template>
  <div
    @click="$emit('closeModal')"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-70 "
  />
  <div
    class="addPostModal fixed bg-white p-14 h-4/5 z-30 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight overflow-y-hidden"
  >
    <span
      @click="$emit('closeModal')"
      class="absolute top-16 right-16 cursor-pointer"
    >
      <Icon name="close" />
    </span>
    <div>
      <div class="text-3xl font-gbold flex items-center">
        <span>Add a Post 🔖</span>
        <div @click="showInfo = true">
          <Icon name="info" />
        </div>
      </div>
      <div class="my-6">
        Record your experience with people around the world!. Select the
        challenge you wish to conquer!. Along with that enter the title,
        description and atleast one image of your work. Be creative with your
        words. As most upvoted posts get to be in the main page!
      </div>
    </div>
    <div class="h-2/3 overflow-y-auto">
      <div class="grid sm:grid-cols-4 gap-4 md:px-10 items-center">
        <label for="challenge">Challenge</label>
        <div class="col-span-3 relative">
          <input
            id="challengeInput"
            type="text"
            autocomplete="off"
            v-model="challengeTyped"
            class="input-border pl-4 py-1 focus:outline-none font-glight"
            placeholder="Search"
            @focus="loadAll()"
            @blur="updatedChallenges = []"
          />
          <label for="challengeInput" class="absolute top-3 right-2">
            <ModalSVG name="downArrow" />
          </label>
          <ul
            v-if="updatedChallenges.length"
            class="absolute w-full top-9 overflow-y-auto max-h-40 bg-white rounded-sm border border-gray-200 transition-transform p-2"
          >
            <li
              class="pl-4 py-2 font-glight cursor-pointer hover:bg-gray-100 border-b border-myBlue"
              v-for="(challenge, index) in updatedChallenges"
              :key="index"
              @mousedown="submitChallenge(challenge)"
            >
              {{ challenge.badgeName }}
            </li>
          </ul>
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

        <!-- Tags display -->
        <div class="col-start-2 col-span-3">
          <div
            v-for="(t, index) in post.tags"
            :key="index"
            class="text-myBlue border-2 border-myBlue font-gbold inline-block rounded-md pl-3 py-1 mr-3 mt-2"
          >
            <div class="flex items-center">
              <span># {{ t }}</span>
              <span
                class="cursor-pointer font-glight"
                @click="post.tags.splice(index, 1)"
              >
                <Icon name="close" />
              </span>
            </div>
          </div>
        </div>
        <div class="font-gbold whitespace-nowrap">Add Image</div>
        <div class="relative flex">
          <label
            for="img"
            class="bg-myRed flex items-center px-3 rounded-sm cursor-pointer"
          >
            <div class="w-7 h-7 p-1 text-white mr-2">
              <ModalSVG name="imageIcon" />
            </div>
            <span class="text-sm text-white whitespace-nowrap">Image +</span>
          </label>
          <div
            v-if="post.post"
            class="bg-myBlue text-white px-2 py-1 text-xs ml-4 rounded-md whitespace-nowrap"
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
        <div v-if="previewLink" class="col-span-full grid place-items-center">
          <img
            :src="previewLink"
            alt="preview-img"
            width="300"
            @load="revoke()"
          />
        </div>
      </div>

      <div v-if="!confirmation" class="text-center mt-10">
        <button
          @click="confirmation = true"
          class="tracking-widest text-sm font-gbold text-myRed px-3 py-2 border-2 border-myRed rounded-full"
          type="submit"
        >
          POST
        </button>
      </div>
      <div v-if="confirmation" class="text-center mt-10">
        <div class="font-gbold text-myRed">You sure?</div>
        <div class="mb-6 text-xs text-gray-500">
          Don't worry you can always update or delete them later
        </div>
        <div class="flex justify-center gap-10 font-gbold">
          <div>
            <button
              @click="onSubmit()"
              class="text-myBlue border-2 border-myBlue p-2 rounded-md"
            >
              Confirm
            </button>
          </div>
          <div class="text-myRed border-2 border-myRed p-2 rounded-md">
            <button @click="confirmation = false">
              No Wait
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Info modal for add post -->
  <InfoModal @close="showInfo = false" v-if="showInfo" modal="addPostInfo" />

  <!-- Lost Streak modal -->
  <LostStreakModal @close="showLostStreak = false" v-if="showLostStreak" />
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import ModalSVG from "@/components/modals/modalSVG";
import Icon from "@/components/post/postSVG";
import LostStreakModal from "@/components/modals/lostStreakModal";
import { getBadges } from "@/composables/badges";
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { addPostFn, isBlank } from "@/composables/posts";
import InfoModal from "@/components/modals/infoModal";
import { useToast } from "vue-toastification";
import { focusSearch } from "@/composables/fuzzySearch";

export default {
  components: { ModalSVG, Icon, InfoModal, LostStreakModal },
  emits: ["closeModal", "confetti"],
  setup(props, { emit }) {
    const { updateShouldFocusSearch } = focusSearch();
    const { getAllBadges, loadBadges } = getBadges();
    const challenges = ref([]);
    const updatedChallenges = ref([]);

    const confirmation = ref(false);
    const showInfo = ref(false);
    const showLostStreak = ref(false);
    const toast = useToast();

    const challengeTyped = ref(null);
    const tag = ref("");
    const previewLink = ref(null);

    const post = reactive({
      title: null,
      description: null,
      badgeName: null,
      post: null,
      tags: [],
    });

    onMounted(async () => {
      anime({
        targets: ".addPostModal",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
      updateShouldFocusSearch(false);
      challenges.value = getAllBadges.value;
      if (challenges.value.length === 0) await loadBadges();
    });

    watch(challengeTyped, () => {
      updatedChallenges.value = challenges.value.filter((badge) =>
        badge.badgeName
          .toLowerCase()
          .includes(challengeTyped.value?.toLowerCase())
      );
    });

    const loadAll = () => (updatedChallenges.value = getAllBadges.value);

    const addTag = () => {
      if (!isBlank(tag.value)) post.tags.push(tag.value);
      tag.value = "";
    };

    const onSelectImage = (event) => {
      post.post = event.target.files[0];
      previewLink.value = URL.createObjectURL(event.target.files[0]);
    };

    const submitChallenge = (challenge) => {
      post.badgeName = challenge.badgeName;
      challengeTyped.value = challenge.badgeName;
      updatedChallenges.value = [];
    };

    const onSubmit = async () => {
      const res = await addPostFn(post, "POST");

      if (res === 0) {
        toast.success(
          "Yayy! another day another post!🥳. Refresh the page to see the changes!"
        );
        emit("confetti", null);
        emit("closeModal", null);
      } else if (res === 2) {
        console.log("Setting the lost streak modal");
        showLostStreak.value = true;
      }
    };

    const revoke = () => {
      URL.revokeObjectURL(previewLink);
    };

    onBeforeUnmount(() => {
      updateShouldFocusSearch(true);
    });

    return {
      tag,
      addTag,
      confirmation,
      loadAll,
      challengeTyped,
      updatedChallenges,
      post,
      showLostStreak,
      submitChallenge,
      onSelectImage,
      onSubmit,
      previewLink,
      showInfo,
      revoke,
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
