<template>
  <div
    @click="$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white z-20 h-4/5 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-3/4 md:m-auto lg:w-2/3 font-glight"
  >
    <div v-if="!isCommentActive" class="relative">
      <div class="absolute top-64">
        <PostSVG
          class="cursor-pointer arrow-bounce"
          @click="$emit('shift', -1)"
          name="leftArrow"
        />
      </div>
      <div class="px-14 py-5">
        <!-- middle -->
        <div class="flex justify-between mt-4 items-center scroll hide-scroll">
          <!-- header -->
          <div class="flex justify-start items-center">
            <div class="text-2xl font-gbold">@ {{ post?.username }}</div>
            <div class="ml-3 streak-btn">{{ post?.points }}</div>
          </div>
          <div class="flex items-center">
            <PostSVG
              class="cursor-pointer"
              @click="toggleLike"
              :name="liked ? 'likeDark' : 'likeLight'"
            />
            <span>{{ post?.upvotes.length }}</span>
            <div class="ml-5">
              <PostSVG
                name="comment"
                class="cursor-pointer"
                @click="isCommentActive = true"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-xs text-gray-400 mr-5">{{ post?.createDate }}</div>
            <PostSVG
              style="width:12px"
              class="cursor-pointer enlarge"
              name="close"
              @click="$emit('close', null)"
            />
          </div>
        </div>
        <div>
          <div class="text-2xl my-7 font-gbold tracking-widest text-center">
            {{ post?.title }}
          </div>
          <div class="post-body">
            <div class="tracking-wide">
              {{ post?.description }}
            </div>
            <div class="flex flex-col justify-items-center">
              <div v-for="(img, index) in post?.image" :key="index">
                <img class="w-full mt-10" :src="img" alt="post-image" />
              </div>
            </div>
          </div>

          <div class="flex px-10 mt-3">
            <div class="tag" v-for="(tag, index) in post?.tags" :key="index">
              {{ tag }}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-64 right-0">
        <PostSVG
          class="cursor-pointer w-3 arrow-bounce"
          @click="$emit('shift', 1)"
          name="rightArrow"
        />
      </div>
    </div>
    <div v-if="isCommentActive">
      <PostSVG
        class="cursor-pointer w-3"
        name="leftArrow"
        @click="isCommentActive = false"
      />
      <div>
        <PostSVG name="comment" />
        <div>Comments</div>
      </div>
      <div class="h-96 overflow-y-scroll">
        <div v-for="comment in comments" :key="comment?.commentId">
          <div>
            <div>
              <img :src="comment.photoURL" alt="profile-pic" />
              <div>@ {{ comment.username }}</div>
            </div>
            <div>{{ comment.createdAt }}</div>
          </div>
          <div>{{ comment.comment }}</div>
        </div>
      </div>
      <div>
        <input
          v-model="userComment"
          class="border-b border-gray-400"
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
</template>

<script>
import { timeAgo } from "@/generate.js";
import PostSVG from "../post/postSVG";
import { mapState } from "vuex";
import api from "@/api.js";

export default {
  components: {
    PostSVG,
  },
  props: ["post"],
  emits: ["upvote", "downvote", "close", "shift"],
  computed: {
    ...mapState({
      authToken: (state) => state.auth.idToken,
    }),
  },
  data() {
    return {
      liked: false, //TODO: doesn't change the UI
      isCommentActive: false,
      userComment: "",
      comments: [],
      config: {
        headers: {
          Authorization: "",
        },
      },
    };
  },
  mounted() {
    this.config.headers.Authorization = this.authToken;
    this.getComments();
  },
  methods: {
    async sendComment() {
      try {
        const commentBody = {
          comment: this.userComment,
          postId: this.post.postId,
        };

        console.log("mydetails", commentBody, this.config);

        const res = await api.post("/posts/comments", commentBody, this.config);
        console.log("Response to comment sent", res);

        const comment = res.data.response;

        let commentObj = {
          username: "SaiTeja T",
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GgW8OnoGpycEgKFsN1Fvnl6nONwKhXSi2VboLv_Iw=s96-c",
          comment: comment.comment,
          createdAt: timeAgo(new Date(), new Date(comment.createdAt)),
        };

        console.log("New comment object created", commentObj);
        this.comments.unshift(commentObj);

        this.userComment = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      //TODO: Sort comments based on dates

      for (let i = 0; i < 10; i++) {
        let commentObj = {
          username: "SaiTeja T",
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GgW8OnoGpycEgKFsN1Fvnl6nONwKhXSi2VboLv_Iw=s96-c",
          comment: "Keep up the good work",
        };

        commentObj.id = i;

        let date = new Date();
        date.setDate(date.getDate() - i);
        commentObj.createdAt = timeAgo(new Date(), date); //current date vs previous date

        this.comments.push(commentObj);
      }
      // try {
      //   const config = {
      //     headers: {
      //       Authorization: this.authToken,
      //     },
      //   };
      //   const data = {
      //     postId: this.post.postId,
      //   };
      //   console.log("data", data);
      //   const result = await api.get("/posts/getPost", config, data);
      //   console.log("comments", result);
      // } catch (error) {
      //   console.log("Error while getting comments", error);
      // }
    },
    async toggleLike() {
      try {
        const data = {
          postId: this.post.postId,
        };
        console.log(this.post.postId);
        if (!this.liked) {
          const result = await api.post("/posts/upvote", data, this.config);
          console.log(result);
          if (result.data.message) window.alert(result.data.message);
          this.$emit("upvote", this.post?.index);
          this.liked = !this.liked;
        } else {
          const result = await api.post(
            "/posts/removeUpvote",
            data,
            this.config
          );
          if (result.data.message) window.alert(result.data.message);
          this.$emit("downvote", this.post?.index);
          this.liked = !this.liked;
        }
      } catch (error) {
        console.log("Unable to upvote ", error);
      }
    },
  },
};
</script>

<style scoped>
.arrow-bounce {
  animation: arrow-bounce 1.5s infinite;
}

.post-body {
  padding: 0 40px;
  overflow: scroll;
  height: 350px;
}

.post-body::-webkit-scrollbar {
  display: none;
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
