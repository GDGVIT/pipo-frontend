<template>
  <div class="relative">
    <div class="flex items-center">
      <input
        type="text"
        v-model="badgeTyped"
        @keyup="filterAndDisplay"
        class="pl-4 border-b-2 w-40 md:w-60 border-gray-400 focus:outline-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <ul
      class="absolute w-40 top-6 md:w-60 overflow-y-auto max-h-32 bg-gray-50 rounded-sm border border-gray-200 transition-transform"
    >
      <li
        class="pl-4 py-2 font-glight text-sm cursor-pointer hover:bg-gray-200"
        v-for="(badge, index) in updatedBadges"
        :key="index"
        @click="selectBadge(badge)"
      >
        {{ badge }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import api from "@/api";

export default {
  mounted() {
    this.getBadges();

    document.addEventListener("click", () => {
      this.updatedBadges = [];
    });
  },

  computed: mapState({
    config: (state) => state.auth.config,
  }),

  data() {
    return {
      badgeTyped: "",
      showDropdown: "",
      updatedBadges: [],
      badges: [],
      badgeSelected: "",
    };
  },

  methods: {
    ...mapActions({
      generalFilter: "setGeneralPostsFilter",
      myFilter: "setMyPostsFilter",
    }),

    async getBadges() {
      const res = await api.get("/badge", this.config);
      const badges = res.data.map((badge) => {
        return badge.badgeName;
      });

      console.log("Badges obtained from backend are..", badges);
      this.badges = badges;
      this.badges.unshift("All");
    },

    filterAndDisplay() {
      this.showDropdown = true;
      this.updatedBadges = this.badges.filter((badge) => {
        if (badge.indexOf(this.badgeTyped) > -1) {
          return true;
        } else {
          return false;
        }
      });
    },

    selectBadge(badge) {
      this.badgeTyped = "";
      this.updatedBadges = [];

      // TODO: Verify this once in the future
      const path = this.$route.path;
      console.log(path);
      if (path === "/") {
        this.generalFilter(badge);
      } else if (path === "/posts") {
        this.myFilter(badge);
      }
    },
  },
};
</script>

<style></style>
