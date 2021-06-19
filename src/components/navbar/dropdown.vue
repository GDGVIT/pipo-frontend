<template>
  <!-- TODO: Make filter work with load more -->
  <div class="relative w-60 sm:w-96">
    <div class="flex items-center">
      <input
        type="text"
        ref="dropdown"
        v-model="badgeTyped"
        @click="loadAll()"
        class="pl-4 border-b-2 w-full py-1 focus:outline-none font-gregular"
        placeholder="Search"
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
      v-if="updatedBadges.length"
      class="absolute w-full top-8 overflow-y-auto max-h-48 bg-white rounded-sm border border-gray-200 transition-transform p-2"
    >
      <li
        class="pl-4 py-2 font-gregular cursor-pointer hover:bg-gray-100 border-b border-gray-200 rounded-md"
        v-for="(badge, index) in updatedBadges"
        :key="index"
        @click="selectBadge(badge)"
      >
        {{ badge.badgeName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getBadges } from "../../composables/badges";
import { setUser } from "../../composables/auth";
import { filter } from "../../composables/filter";

import { ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const badges = ref([]);
    const badgeTyped = ref(null);
    const updatedBadges = ref([]);
    const dropdown = ref(null);

    const { loadBadges, getAllBadges } = getBadges();
    const { isLoggedIn } = setUser();
    const { generalFilter, myPostsFilter } = filter();

    const route = useRoute();

    document.addEventListener("click", (e) => {
      if (dropdown.value && dropdown.value !== e.target) {
        updatedBadges.value = [];
      }
    });

    watchEffect(() => {
      if (isLoggedIn.value) {
        loadBadges();
        const b = getAllBadges();
        const allBadges = { badgeId: 1, badgeName: "All Badges" };
        badges.value = [allBadges, ...b];
        console.log("Badges after updating from getAlBadges", badges.value);
      }
    });

    watch(badgeTyped, () => {
      console.log("Trying to change filter");
      generalFilter.value = badgeTyped;
      updatedBadges.value = badges.value.filter((badge) =>
        badge.badgeName.toLowerCase().includes(badgeTyped.value?.toLowerCase())
      );
    });

    const loadAll = () => {
      updatedBadges.value = badges.value;
    };

    const selectBadge = (badge) => {
      const path = route.path;
      console.log(route);
      console.log("Badge selected and the current route is :: ", route.path);
      if (path === "/") {
        generalFilter.value = badge;
        console.log("General filter changed to ", generalFilter.value);
      }
      if (path === "/posts") {
        myPostsFilter.value = badge;
        console.log("My Posts filter changed to ", myPostsFilter.value);
      }
      badgeTyped.value = null;
      updatedBadges.value = [];
    };

    return { loadAll, dropdown, badgeTyped, selectBadge, updatedBadges };
  },
};
</script>

<style></style>
