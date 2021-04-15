<template>
  <div
    @click="closeModal"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white z-20 bottom-10 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3"
  >
    <div>
      <div>Add a Post</div>
      <div>
        Record your experience with people around the world!. Select the
        challenge you wish to conquer!. Along with that enter the title,
        description and atleast one image of your work. Be creative with your
        words. As most upvoted posts get to be in the main page!
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="challenge">Challenge</label>
        <select v-model="selectedChallenge" name="challenge" id="challenge">
          <option
            v-for="challenge in challenges"
            :key="challenge"
            :value="challenge"
            >{{ challenge }}
          </option>
        </select>
      </div>
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div>
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          v-model="description"
        />
      </div>
      <div>
        <label for="tags">Tags</label>
        <input type="text" name="tags" v-model="tag" @keydown="addTag" />
        <div v-for="(t, index) in tags" :key="index">
          <div>
            {{ t }}
            <span @click="removeTag(index)">x</span>
          </div>
        </div>
      </div>
      <div>
        <label for="img">
          <ModalSVG name="imageIcon" />
        </label>
        <div class="file-name">{{ imageFile.name }}</div>
        <input
          @change="onSelectImage"
          type="file"
          id="img"
          name="img"
          accept="image/*"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
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
