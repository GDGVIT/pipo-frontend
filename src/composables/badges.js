import api from "@/api.js";
import { generateIdenticon } from "../generate";
import { computed, ref } from "vue";
import { setUser } from "./auth";

const badges = ref([]);

const getBadges = () => {
  const { config } = setUser();

  const loadBadges = async () => {
    if (badges.value.length === 0) {
      try {
        const res = await api.get("/badge", config.value);
        const b = res.data;
        badges.value = b
          .map((badge) => {
            badge.identicon = generateIdenticon(badge.badgeName);
            return badge;
          })
          .sort(sortByUpvotes);
      } catch (error) {
        console.log("Error while obtaining badges from backend!");
      }
    }
  };

  const getStreakBadges = computed(() =>
    badges.value.filter((badge) => badge.hasStreak)
  );

  const getNoStreakBadges = computed(() =>
    badges.value.filter((badge) => !badge.hasStreak)
  );

  const postBadge = async (badgeData) => {
    try {
      const res = await api.post("/badge", badgeData, config.value);
      const { message, createdBadge } = res.data;
      badges.value.push(createdBadge);
      return message;
    } catch (error) {
      console.log("Error while posting badges from frontend to backend", error);
    }
  };

  return { loadBadges, getStreakBadges, getNoStreakBadges, postBadge };
};

const getUserBadges = () => {
  const { config } = setUser();

  const getInProgress = async (cnt) => {
    try {
      const res = await api.get("/badge/inProgress", config.value);
      const inProgressBadges = res.data.arr;
      if (cnt) {
        return inProgressBadges.splice(0, cnt);
      }
      return inProgressBadges;
    } catch (error) {
      console.log("Error while retrieving in progress badges", error);
    }
  };

  const getCompleted = async (cnt) => {
    try {
      const res = await api.get("/badge/completed", config.value);
      const completedBadges = res.data.arr;
      if (cnt) {
        return completedBadges.splice(0, cnt);
      }
      return completedBadges;
    } catch (error) {
      console.log("Error while retrieving completed badges", error);
    }
  };

  return { getInProgress, getCompleted };
};

const sortByUpvotes = (a, b) => b.upvotes - a.upvotes;

export { getBadges, getUserBadges };
