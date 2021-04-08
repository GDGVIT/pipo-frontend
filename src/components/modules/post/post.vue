<template>
  <div class="post-container">
    <div class="post-details">
      <div class="user-details">
        <span class="username">@{{ post.username }}</span>
        <span class="streak">{{ post.streak }}</span>
      </div>
      <div class="upvote-details">
        <postSVG name="likeLight" />
        <span style="font-size:12px">{{ post.upvotes }}</span>
      </div>
    </div>
    <div class="post-body">
      <div class="post-tags"></div>
      <div class="post-content">
        {{ post.content }}
      </div>
      <div class="post-attachments">
        <div
          v-for="(attachment, index) in post.attachments"
          :key="index"
          class="attachment"
        >
          <img
            class="post-image"
            v-if="attachment.type === 'image'"
            :src="attachment.url"
            alt="post-image"
          />
          <video
            class="post-video"
            v-if="attachment.type === 'video'"
            title="video"
          >
            <source :src="attachment.url" type="video/mp4" />
          </video>
          <!-- <iframe width="788" height="443" src="https://www.youtube.com/embed/1zkgdLZEdwM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postSVG from "./postSVG";
export default {
  name: "post",
  props: ["post"],
  components: {
    postSVG,
  },
};
</script>
<style scoped>
.post-container {
  background-color: white;
  border: 2px solid black;
}

.upvote-details {
  display: flex;
  align-items: center;
}

.streak {
  width: 35px;
  height: 25px;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6666;
  color: white;
  margin-left: 10px;
}

.user-details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.username {
  font-family: Gilroy-Bold;
  font-size: 20px;
}

.post-details {
  padding: 20px 40px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-body {
  position: relative;
  padding: 10px 40px;
}

.post-image {
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%, 0);
}

.post-video {
  width: 90%;
  margin-left: 50%;
  transform: translate(-50%, 0);
}

.post-content {
  font-size: 15px;
  margin-bottom: 15px;
}
</style>
