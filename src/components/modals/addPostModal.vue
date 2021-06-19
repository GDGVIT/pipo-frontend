<template>
  <div
    @click="$emit('closeModal')"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <!-- Confetti background -->
  <canvas id="confetti-holder" class="fixed top-0 w-full h-full z-20" />
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
    <div>
      <div class="grid sm:grid-cols-4 gap-4 md:px-10 items-center">
        <label for="challenge">Challenge</label>
        <div class="col-span-3 relative">
          <input
            id="challengeInput"
            type="text"
            ref="dropdown"
            autocomplete="off"
            v-model="challengeTyped"
            class="input-border pl-4 py-1 focus:outline-none font-gregular"
            placeholder="Search"
            @click="loadAll()"
          />
          <label for="challengeInput" class="absolute top-3 right-2">
            <ModalSVG name="downArrow" />
          </label>
          <ul
            v-if="updatedChallenges.length"
            class="absolute w-full top-9 overflow-y-auto max-h-40 bg-white rounded-sm border border-gray-200 transition-transform p-2"
          >
            <li
              class="pl-4 py-2 font-gregular cursor-pointer hover:bg-gray-100 border-b border-myBlue"
              v-for="(challenge, index) in updatedChallenges"
              :key="index"
              @click="submitChallenge(challenge)"
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
          v-model="title"
        />
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          class="input-border resize-none col-span-3"
          style="height:10em"
          autocomplete="off"
          v-model="description"
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
          v-for="(t, index) in tags"
          :key="index"
          class="bg-myBlue text-white font-gbold inline-block rounded-md pl-3 py-1 mr-3"
        >
          <div class="flex items-center">
            <span>{{ t }}</span>
            <span
              class="cursor-pointer font-glight"
              @click="tags.splice(index, 1)"
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

      <!-- Info modal for add post -->
      <InfoModal
        @close="showInfo = false"
        v-if="showInfo"
        modal="addPostInfo"
      />
    </div>
  </div>
</template>

<script>
import ModalSVG from "./modalSVG";
import ConfettiGenerator from "confetti-js";
import Icon from "../post/postSVG";
import { getBadges } from "../../composables/badges";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { addPostFn } from "../../composables/posts";
import InfoModal from "../../components/modals/infoModal";
import { useToast } from "vue-toastification";

export default {
  components: { ModalSVG, Icon, InfoModal },
  emits: ["closeModal"],
  setup() {
    const { getAllBadges } = getBadges();
    const challenges = ref([]);
    const updatedChallenges = ref([]);
    const challengeTyped = ref(null);
    const dropdown = ref(null);
    const confirmation = ref(false);
    const showInfo = ref(false);
    const toast = useToast();

    const title = ref(null);
    const description = ref(null);
    const tag = ref("");
    const selectedChallenge = ref(null);
    const imageFile = ref(null);
    const tags = ref([]);

    let confetti = null;

    onMounted(() => (challenges.value = getAllBadges()));

    watch(challengeTyped, () => {
      updatedChallenges.value = challenges.value.filter((badge) =>
        badge.badgeName
          .toLowerCase()
          .includes(challengeTyped.value?.toLowerCase())
      );
    });

    document.addEventListener("click", (e) => {
      if (dropdown.value && dropdown.value !== e.target) {
        updatedChallenges.value = [];
      }
    });

    const loadAll = () => (updatedChallenges.value = getAllBadges());

    const addTag = () => {
      tags.value.push(tag.value);
      tag.value = "";
    };

    const onSelectImage = (event) => {
      imageFile.value = event.target.files[0];
    };

    const submitChallenge = (challenge) => {
      selectedChallenge.value = challenge.badgeName;
      challengeTyped.value = challenge.badgeName;
      updatedChallenges.value = [];
    };

    const onSubmit = async () => {
      const res = await addPostFn({
        title: title.value,
        badgeName: selectedChallenge.value,
        description: description.value,
        post: imageFile.value,
        tags: tags.value,
      });

      const confettiSettings = {
        target: "confetti-holder",
        max: 160,
        rotate: true,
      };
      confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      if (res === 0) {
        toast.success("Yayy! another day another post!🥳");
      }
    };

    onBeforeUnmount(() => confetti?.clear());

    return {
      title,
      tags,
      tag,
      addTag,
      confirmation,
      loadAll,
      dropdown,
      description,
      challengeTyped,
      updatedChallenges,
      imageFile,
      submitChallenge,
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
