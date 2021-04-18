<template>
  <div
    @click="closeModal"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white p-14 h-4/5 z-20 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight hide-scroll"
  >
    <div>
      <div class="text-3xl font-gbold text-myBlue">Add a Post</div>
      <div class="my-6">
        Record your experience with people around the world!. Select the
        challenge you wish to conquer!. Along with that enter the title,
        description and atleast one image of your work. Be creative with your
        words. As most upvoted posts get to be in the main page!
      </div>
    </div>
    <form @submit.prevent="onSubmit" class="m-auto">
      <div class="my-2">
        <label for="challenge">Challenge</label>
        <select
          v-model="selectedChallenge"
          name="challenge"
          id="challenge"
          class="input-border"
        >
          <option
            v-for="challenge in challenges"
            :key="challenge"
            :value="challenge"
            >{{ challenge }}
          </option>
        </select>
      </div>
      <div class="my-2">
        <label for="title">Title</label>
        <input
          class="input-border"
          type="text"
          name="title"
          id="title"
          v-model="title"
        />
      </div>
      <div class="my-2">
        <label for="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          class="input-border resize-none"
          style="height:10em"
          v-model="description"
        />
      </div>
      <div>
        <label for="tags">Tags</label>
        <input
          type="text"
          class="input-border"
          name="tags"
          v-model="tag"
          @keydown="addTag"
        />
        <div v-for="(t, index) in tags" :key="index">
          <div>
            {{ t }}
            <span @click="removeTag(index)">x</span>
          </div>
        </div>
      </div>
      <div class="my-4">
        <div class="font-gbold">Add Images</div>
        <div class="relative flex">
          <label for="img">
            <ModalSVG name="imageIcon" />
          </label>
          <div class="bg-myBlue text-white px-2 py-1 text-xs ml-4 rounded-md">
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
      <div class="absolute right-14">
        <button
          class="tracking-widest text-sm font-gbold bg-myRed px-3 py-2 text-white"
          type="submit"
        >
          POST
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ModalSVG from "./modalSVG";
import api from "@/api.js";
import { mapState } from "vuex";

export default {
  components: {
    ModalSVG,
  },
  emits: {
    closeModal: (post) => {
      if (post) {
        return post;
      } else {
        return false;
      }
    },
  },
  computed: {
    ...mapState({
      authToken: (state) => state.auth.idToken,
    }),
  },
  data() {
    return {
      challenges: [],
      imageFile: "",
      title: "",
      description: "",
      selectedChallenge: "",
      tag: "",
      tags: [],
    };
  },
  mounted() {
    console.log("Add Post Button was clicked!");
    this.getBadges();
  },
  methods: {
    addTag(event) {
      if (event.which === 13) {
        this.tags.push(this.tag);
        this.tag = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async getBadges() {
      const config = {
        headers: {
          Authorization: this.authToken,
        },
      };

      let result = await api.get("/badge", config);
      this.challenges = result.data.map((badge) => badge.badgeName);
    },
    closeModal() {
      this.$emit("closeModal", false);
    },
    onSelectImage(event) {
      const imageFile = event.target.files[0];
      console.log("image", imageFile);
      this.imageFile = imageFile;
    },
    async onSubmit() {
      try {
        const formData = new FormData();
        formData.append("post", this.imageFile);
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("badgeName", this.selectedChallenge);

        const config = {
          headers: {
            Authorization: this.authToken,
            "Content-Type": "multipart/form-data",
          },
        };

        const result = await api.post("/posts", formData, config);
        const postCreated = result.data.response.postCreated;
        console.log("postCreated", postCreated);

        this.$emit("closeModal", postCreated);
      } catch (error) {
        console.log("Error occured while submitting the form " + error);
      }
    },
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

label {
  font-family: Gilroy-Bold;
}

input[type="file"] {
  display: none;
}
</style>
