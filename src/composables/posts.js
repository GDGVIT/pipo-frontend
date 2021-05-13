import api from "@/api.js";
import { computed, ref } from "vue";
import { setUser } from "./auth";
import { timeAgo } from "@/generate.js";

const generalPosts = ref(null);
const currIndex = ref(0);

const getPosts = () => {
  const loadPosts = async () => {
    if (!generalPosts.value) {
      const { config } = setUser();

      console.log("Getting config from user", config.value);

      try {
        const res1 = await api.get("/posts/myLatestPost", config.value);
        const res2 = await api.get("/posts/allLatestPosts/8", config.value);

        const myLatestPost = filterMyLatestPost(res1.data);

        const latestPosts = res2.data.posts
          .filter((post) => post !== null)
          .map((post) => {
            if (post.upvotes === null) post.upvotes = [];
            if (post.username === null) post.username = "anonymous";
            // TODO: Remove this later once tags are added
            post.tags = ["Tag 1", "Tag 2", "Tag 3"];

            //changing date format
            let date = post.createDate;
            post.createDate =
              date.substring(0, 10) + " " + date.substring(11, 19);

            return post;
          })
          .sort(sortByPoints);

        console.log("Latest Posts", latestPosts);
        const p = [myLatestPost, ...latestPosts];

        generalPosts.value = p;
      } catch (error) {
        console.log("Error while receiving latest posts from backend", error);
      }
    }
  };

  const fetchPosts = () => generalPosts.value;

  return { fetchPosts, loadPosts };
};

const addPostFn = () => {
  // generalPosts[0] = newPost;
};

const postModalFn = () => {
  const { user, config } = setUser();

  const assignIndex = (index) => (currIndex.value = index);

  const getCurrentPost = () => generalPosts.value[currIndex.value];

  const getNextPost = () => {
    if (currIndex.value < generalPosts.value.length) currIndex.value++;
    return getCurrentPost();
  };

  const getPrevPost = () => {
    if (currIndex.value > 0) currIndex.value--;
    return getCurrentPost();
  };

  const openPost = (index) => (currIndex.value = index);

  const vote = async () => {
    const index = currIndex.value;
    const post = getCurrentPost();

    let toBeUpvoted = true;

    for (let i = 0; i < post.upvotes.length; i++) {
      if (post.upvotes[i] === user.userId) {
        toBeUpvoted = false;
        break;
      }
    }

    if (toBeUpvoted) {
      console.log("User has not yet upvoted");
      try {
        const postId = post?.postId;
        const res = await api.post("/posts/upvote", { postId }, config.value);
        //TODO: Currently not upvoting check it once
        console.log(res.data);
      } catch (error) {
        console.log("Error while upvoting the post", error);
      }
      generalPosts.value[index].upvotes.push(user.value.userId);
    } else {
      console.log("User has already upvoted!");
      try {
        const postId = post?.postId;
        const res = await api.post(
          "/posts/remoteUpvote",
          { postId },
          config.value
        );
        //TODO: Currently not downvoting check it once
        console.log(res.data);
      } catch (error) {
        console.log("Error while upvoting the post", error);
      }

      generalPosts.value[index].upvotes = generalPosts.value[
        index
      ].upvotes.filter((post) => post.id !== user.value.userId);
    }
  };

  return {
    getCurrentPost,
    getNextPost,
    getPrevPost,
    openPost,
    vote,
    assignIndex,
  };
};

const sortByPoints = (a, b) => b.points - a.points;

const filterMyLatestPost = (post) => {
  if (post.upvotes === null) post.upvotes = [];

  //TODO: Change these later
  post.points = 20;
  post.username = "anonymous";
  // TODO: Remove this later once tags are added
  post.tags = ["Tag 1", "Tag 2", "Tag 3"];

  //changing date format
  let date = post.createDate;
  post.createDate = date.substring(0, 10) + " " + date.substring(11, 19);
  return post;
};

const getComments = () => {
  const { config } = setUser();
  const comments = ref([]);

  const loadComments = async () => {
    const id = generalPosts.value[currIndex.value].postId;

    try {
      const res = await api.post(`/posts/getPost/${id}`, {}, config.value);
      comments.value = res.data.comments;
    } catch (error) {
      console.log(
        "Error while obtaining comments of the post from backend",
        error
      );
    }
  };

  const orderedComments = computed(() => {
    return comments.value.sort(sortByDate).map((comment) => {
      // If username is null make it anonymous
      if (comment.userName === null) comment.userName = "anonymous";

      if (!comment.createdAt.includes("ago")) {
        comment.createdAt = timeAgo(new Date(), new Date(comment.createdAt));
        comment.updatedAt = timeAgo(new Date(), new Date(comment.updatedAt));
      }

      return comment;
    });
  });

  const postComment = async (comment) => {
    const data = {
      comment,
      postId: generalPosts.value[currIndex.value].postId,
    };

    try {
      const res = await api.post("/posts/comments", data, config.value);
      comments.value.push(res.data.response);
    } catch (error) {
      console.log("Error while posting a comment to the post", error);
    }
  };

  return { loadComments, orderedComments, postComment };
};

const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

export { getPosts, postModalFn, addPostFn, getComments };
