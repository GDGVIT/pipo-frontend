import api from "@/api.js";
import { computed, ref, watch } from "vue";
import { setUser } from "./auth";
import { useToast } from "vue-toastification";
import { validateUserName } from "../composables/posts";

const { config, user } = setUser();

const userInfo = ref(null);
const followers = ref([]);
const following = ref([]);
const friends = ref([]);
const error = ref(null);
const toast = useToast();

// watch for errors
watch(error, () => toast.error(error.value));

const getProfile = () => {
  const loadProfile = async () => {
    try {
      if (!userInfo.value && user.value?.userId) {
        const res = await api.get(`/user/${user.value.userId}`, config.value);
        userInfo.value = filterRandomUser(res.data);
        console.log("user value", userInfo.value);
      }
    } catch (err) {
      console.log(
        "Error occured while fetching user details from backend",
        err
      );
      error.value =
        "Wasn't while fetching your details. Try again after sometime! 😓";
    }
  };

  const changeUserDetails = async (data) => {
    try {
      await api.patch(
        "/user/update",
        {
          ...data,
        },
        config.value
      );
      toast.success("Username updated refresh page to see the changes");
    } catch (error) {
      console.log("Error while updating user details in the backend", error);
    }
  };

  const profile = computed(() => userInfo.value);

  return { profile, loadProfile, changeUserDetails };
};

const socialCircle = () => {
  const randomUserInfo = ref(null);

  const loadFollowing = async () => {
    if (user.value.userId && following.value.length === 0) {
      try {
        const res = await api.get(
          `/follow/following/${user.value.userId}`,
          config.value
        );
        following.value = res.data;
        console.log("Following", following.value);
      } catch (err) {
        console.log("Error while fetching following of user from backend", err);
        error.value = err;
      }
    }
  };

  const loadFollowers = async () => {
    if (user.value.userId && followers.value.length === 0) {
      try {
        const res = await api.get(
          `/follow/followers/${user.value.userId}`,
          config.value
        );
        followers.value = res.data;
        console.log("Followers", followers.value);
      } catch (err) {
        console.log("Error while fetching followers of user from backend", err);
        error.value = err;
      }
    }
  };

  const loadFriends = async () => {
    if (user.value.userId && friends.value.length === 0) {
      try {
        const res = await api.get(
          `/follow/friend/${user.value.userId}`,
          config.value
        );
        friends.value = res.data;
        console.log("Friends", friends.value);
      } catch (err) {
        console.log("Error while loading friends of a user from backend", err);
        error.value = err;
      }
    }
  };

  const followThisPerson = async (userId) => {
    if (userId) {
      try {
        const res = await api.post(
          `/follow/toFollow/${userId}`,
          {},
          config.value
        );
        console.log("Response from backend on following the user", res);
        if (res.data.message) throw new Error(res.data.message);

        randomUserInfo.value.user.following++;
        toast.success("Following this person 🤗");
        following.value.push(res.data);
      } catch (err) {
        error.value = err;
        console.log("Error while attempting to follow the user", err);
      }
    }
  };

  const makeFriend = async (userId) => {
    if (userId) {
      try {
        const res = await api.post(
          `/follow/makeFriend/${userId}`,
          {},
          config.value
        );
        console.log("Response from backend on sending friend request", res);
        if (res.data.message) throw new Error(res.data.message);

        randomUserInfo.value.user.friends++;
        toast.success("Added as a friend");
      } catch (err) {
        error.value = "Unable to add as a friend. Try again after sometime!";
        console.log("Error while sending friend request through backend", err);
      }
    }
  };

  const getRandomUserProfile = async (userId) => {
    if (userId) {
      try {
        const res = await api.get(`/user/${userId}`, config.value);
        const randomUserFiltered = filterRandomUser(res.data);
        randomUserInfo.value = randomUserFiltered;
        console.log("Random user details", randomUserInfo.value);
      } catch (err) {
        console.log(
          "Error while fetching random user details from backend",
          err
        );
      }
    }
  };

  const randomUserDetails = computed(() => randomUserInfo.value);

  return {
    loadFollowers,
    loadFollowing,
    loadFriends,
    followThisPerson,
    makeFriend,
    getRandomUserProfile,
    randomUserDetails,
  };
};

const filterRandomUser = (u) => {
  u.user.userName = validateUserName(
    u.user.userName ? u.user.userName : "anonymous"
  );
  u.user.points = u.user.points ? u.user.points : 0;
  u.user.tags = u.user.tags ? u.user.tags : [];
  if (u.user.tags.length > 5) u.user.tags = u.user.tags.slice(0, 5);
  return u;
};

export { getProfile, socialCircle };
