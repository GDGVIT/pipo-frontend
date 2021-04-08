<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>

    <form class="add-post-box">
      <div class="header">
        <div class="title">New Post</div>
      </div>

      <div class="idea">
        A new day, a new post select the challenge you aim to solve today 🎯 and
        explain about it in the description. Add images or videos to make the
        post look even better so that it gets the upvotes ⬆ you like!
      </div>
      <div class="add-post-challenge">
        <label for="challenge">Challenge</label>
        <select v-model="selectedChallenge" name="challenge" id="challenge">
          <option
            v-for="challenge in challenges"
            :key="challenge.id"
            :value="challenge.name"
            >{{ challenge.name }}
            <img class="badge-icon" :src="challenge.badgeURL" alt="badge-img" />
          </option>
        </select>
      </div>
      <div class="add-post-content">
        <label for="content">Description</label>
        <textarea v-model="content" name="content" id="content"></textarea>
      </div>
      <div class="add-post-attachment">
        <div class="image-attachment">
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
        <div class="video-attachment">
          <label for="video">
            <ModalSVG name="videoIcon" />
          </label>

          <div class="file-name">{{ videoFile.name }}</div>
          <input
            @change="onSelectVideo"
            type="file"
            id="video"
            name="video"
            accept="video/*"
          />
        </div>
      </div>
      <button @submit.prevent="onSubmit" class="post-submit" type="submit">
        Add Post
        <PostSVG name="plus" class="plus" />
      </button>
    </form>
  </div>
</template>

<script>
import ModalSVG from "./modalSVG";
import PostSVG from "../post/postSVG";
import axios from "axios";
const URL = "http://localhost:3000/challenges";

export default {
  name: "add-post-modal",
  components: {
    ModalSVG,
    PostSVG,
  },
  data() {
    return {
      challenges: [],
      imageFile: "",
      videoFile: "",
      content: "",
      selectedChallenge: "",
    };
  },
  mounted() {
    axios.get(URL).then((result) => {
      const data = result.data;
      this.challenges = data;
    });
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    onSelectImage(event) {
      const imageFile = event.target.files[0];
      console.log("image", imageFile);
      this.imageFile = imageFile;
    },
    onSelectVideo(event) {
      const videoFile = event.target.files[0];
      console.log("video", videoFile);
      this.videoFile = videoFile;
    },
    onSubmit() {
      if (this.selectedChallenge === "" || this.content === "")
        console.log("video", this.videoFile);
      console.log("image", this.imageFile);

      const formData = new FormData();
      formData.append("file", this.imageFile);
      formData.append("file", this.videoFile);

      console.log("formData", formData);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
  font-family: "Gilroy-Bold";
}

.idea {
  margin: 20px 0;
}

.overlay {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.add-post-box {
  position: fixed;
  width: 80%;
  height: 70vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 3;
  padding: 30px;
  box-sizing: border-box;
}

.add-post-challenge {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.add-post-attachment {
  display: flex;
  justify-content: center;
}

#content {
  width: 100%;
  margin: 10px 0;
  height: 20vh;
  resize: none;
  outline: none;
  font-size: 15px;
  font-family: "Gilroy";
}

#challenge {
  padding: 5px 10px;
  border-radius: 10px;
  width: 200px;
  outline: none;
  font-family: "Gilroy";
}

#img,
#video {
  display: none;
}

label {
  margin-right: 30px;
}

.post-submit {
  font-family: "Gilroy-Bold";
  font-size: 15px;
  background-color: white;
  border: 1px solid black;
  padding: 10px 15px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}

.plus {
  fill: black;
}

.post-submit:hover {
  cursor: pointer;
  background-color: rgba(250, 250, 250);
}
</style>

<!-- <div v-if="confirmDisplay" class="confirm-container">
        <button
          class="confirm-btn yes"
          @submit.prevent="onSubmit"
          type="submit"
        >
          Yes
        </button>
        <button
          class="confirm-btn no"
          @click="() => (confirmDisplay = false)"
          type="submit"
        >
          No
        </button>
      </div> -->

<!-- .confirm-btn {
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
  font-family: "Gilroy-Bold";
  letter-spacing: 1px;
  margin: 10px 10px;
}

.yes {
  background-color: #38db53;
}
.no {
  background-color: rgb(255, 63, 50);
} 

.yes:hover,
.no:hover {
  opacity: 0.9;
  cursor: pointer;
}-->
