import api from "@/api.js";
import { computed, ref } from "vue";
import { setUser } from "./auth";
import { generateIdenticon, timeAgo } from "@/generate.js";
import { filter } from "./filter";
import { useRoute } from "vue-router";

const generalPosts = ref(null);
const myPosts = ref(null);
const latestPost = ref(null);
const currIndex = ref(0);
const count = ref(8);

// MASONRY
const resizing = () => {
  const resizeGridItem = (grid) => {
    if (grid) {
      // console.log("grid", grid);

      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );

      // console.log("Row Height", rowHeight);

      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      );

      // console.log("Row Gap", rowGap);

      grid.style.gridAutoRows = "auto";
      grid.style.alignItems = "self-start";

      // console.log(grid.querySelectorAll(".post"));

      grid.querySelectorAll(".post").forEach((item) => {
        item.style.gridRowEnd = `span ${Math.ceil(
          (item.clientHeight + rowGap) / (rowHeight + rowGap)
        )}`;
      });

      grid.removeAttribute("style");
    }
  };

  return { resizeGridItem };
};

// LATEST POST
const getLatestPost = () => {
  const { config } = setUser();

  const updateLatestPost = async () => {
    const res1 = await api.get("/posts/myLatestPost", config.value);
    const myLatestPost = filterMyLatestPost(res1.data);
    latestPost.value = myLatestPost;
  };
  return { updateLatestPost, latestPost };
};

// GENERAL POSTS
const getPosts = () => {
  // To reset the count to 8
  count.value = 8;

  const { generalFilter } = filter();

  const loadPosts = async () => {
    const { config } = setUser();

    // console.log("Getting config from user", config.value);

    try {
      const res2 = await api.get(
        `/posts/allLatestPosts/${count.value}`,
        config.value
      );

      const latestPosts = res2.data.posts
        .filter((post) => post !== null)
        .map((post) => {
          if (post.upvotes === null) post.upvotes = [];
          if (post.username === null) post.username = "anonymous";

          post.identicon = generateIdenticon(post.badgeName);
          // TODO: Remove this later once tags are added
          post.tags = ["Tag 1", "Tag 2", "Tag 3"];

          post.createDate = timeAgo(new Date(), new Date(post.createDate));
          post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate));

          return post;
        })
        .sort(sortByPoints);

      console.log("Latest Posts", latestPosts);

      generalPosts.value = latestPosts;
    } catch (error) {
      console.log("Error while receiving latest posts from backend", error);
    }
  };

  const loadMore = async () => {
    // console.log("Loading more posts for you :)");
    count.value += generalPosts.value.length < count.value ? 0 : 8;
    await loadPosts();
  };

  const filtered = computed(() => {
    return generalPosts.value?.filter((post) =>
      generalFilter.value === "All Badges"
        ? true
        : post.badgeName === generalFilter.value
    );
  });

  return { loadPosts, loadMore, filtered };
};

// MY POSTS
const myPostsFn = () => {
  count.value = 6;

  const { myPostsFilter } = filter();

  const loadMyPosts = async () => {
    if (!myPosts.value) {
      const { config, user } = setUser();

      // console.log("Getting config from user", config.value);

      try {
        const res = await api.get("/posts/", config.value);

        const myposts = res.data
          .filter((post) => post !== null)
          .sort(sortByPostDate)
          .map((post) => {
            const username = user.value.userName;
            post.upvotes = post.upvotes ? post.upvotes : [];
            post.username = username || "anonymous";

            post.identicon = generateIdenticon(post.badgeName);

            // TODO: Remove this later once tags are added
            post.tags = ["Tag 1", "Tag 2", "Tag 3"];

            post.createDate = timeAgo(new Date(), new Date(post.createDate));
            post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate));

            // TODO: My posts doesn't have points yet
            post.points = 20;

            return post;
          });

        console.log("my posts", myposts);

        myPosts.value = myposts;
      } catch (error) {
        console.log("Error while receiving latest posts from backend", error);
      }
    }
  };

  const filtered = computed(() => {
    return myPosts.value
      ?.slice(0, count.value)
      .filter((post) =>
        myPostsFilter.value === "All Badges"
          ? true
          : post.badgeName === myPostsFilter.value
      );
  });

  const loadMore = () => {
    count.value += 6;
  };

  return { filtered, loadMore, loadMyPosts };
};

// ADD POST
const addPostFn = async (data) => {
  const { config } = setUser();

  // console.log(data);
  try {
    const formData = new FormData();
    formData.append("post", data.post);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("badgeName", data.badgeName);

    const result = await api.post("/posts", formData, config.value);
    const postCreated = result.data.response.postCreated;

    console.log("postCreated", postCreated);
    generalPosts.value.push(postCreated);
    myPosts.value.unshift(postCreated);
    latestPost.value = filterMyLatestPost(postCreated);
  } catch (error) {
    console.log("Error while sending post to the backend", error);
  }
};

// POST MODAL
const postModalFn = () => {
  const { user, config } = setUser();
  const route = useRoute();

  const assignIndex = (index) => (currIndex.value = index);

  const getCurrentPost = computed(() => {
    return route.path === "/"
      ? generalPosts.value
        ? generalPosts.value[currIndex?.value]
        : null
      : myPosts.value
      ? myPosts.value[currIndex?.value]
      : null;
  });

  const getNextPost = () => {
    if (route.path === "/" && currIndex.value < generalPosts.value.length - 1) {
      currIndex.value++;
    } else if (
      route.path === "/posts" &&
      currIndex.value < myPosts.value.length - 1
    ) {
      currIndex.value++;
    }
    return getCurrentPost.value;
  };

  const getPrevPost = () => {
    if (currIndex.value > 0) currIndex.value--;
    return getCurrentPost.value;
  };

  const openPost = (index) => (currIndex.value = index);

  const vote = async () => {
    const index = currIndex.value;
    const post = getCurrentPost.value;

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
        // TODO: Currently not upvoting check it once
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
        // TODO: Currently not downvoting check it once
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

// POST COMMENTS
const getComments = () => {
  const { config } = setUser();
  const comments = ref([]);
  const route = useRoute();

  const loadComments = async () => {
    const id =
      route.path === "/"
        ? generalPosts?.value[currIndex?.value]?.postId
        : myPosts?.value[currIndex?.value]?.postId;

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
      postId:
        route.path === "/"
          ? generalPosts?.value[currIndex?.value]?.postId
          : myPosts?.value[currIndex?.value]?.postId,
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

//

// UTILS
const sortByPoints = (a, b) => b.points - a.points;
const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
const sortByPostDate = (a, b) =>
  new Date(b.updatedDate) - new Date(a.updatedDate);

const filterMyLatestPost = (post) => {
  if (post.upvotes === null) post.upvotes = [];
  post.points = post.points ? post.points : 20;
  post.userName = post.userName ? post.userName : "anonymous";

  // TODO: Remove this later once tags are added
  post.tags = ["Tag 1", "Tag 2", "Tag 3"];
  post.createDate = timeAgo(new Date(), new Date(post.createDate));
  return post;
};

export {
  resizing,
  getPosts,
  postModalFn,
  addPostFn,
  getComments,
  getLatestPost,
  myPostsFn,
};
