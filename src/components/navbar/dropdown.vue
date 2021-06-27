<template>
  <div class="relative w-full md:w-l3 mx-4">
    <DropdownFocus @keyup="slashSearch" />
    <div class="flex items-center">
      <input
        type="text"
        v-model="query"
        @blur="searchResultsVisible = false"
        @focus="searchResultsVisible = true"
        @keydown.esc="searchResultsVisible = false"
        @input="searchResultsVisible = true"
        @keyup="performSearch()"
        class="pl-4 border-b-2 w-full py-1 focus:outline-none font-gregular"
        placeholder="Search (Press / to focus)"
        ref="search"
      />
      <div @click="fixSearch()" class="enlarge">
        <Icon name="search" />
      </div>
    </div>

    <ul
      v-if="searchResultsVisible"
      class="absolute w-full top-8 bg-white rounded-sm border border-gray-200 transition-transform"
    >
      <li class="flex pl-4 my-4 ">
        <div
          @mousedown.prevent="showAll()"
          class="font-gbold bg-myBlue px-2 text-white rounded-full cursor-pointer"
        >
          All Posts
        </div>
      </li>
      <div class="overflow-y-auto max-h-48">
        <li
          class="pl-4 py-2 font-gregular cursor-pointer hover:bg-gray-100 border-b border-myBlue"
          v-for="(post, index) in searchPosts"
          :key="index"
          @mousedown.prevent="showPost(post)"
        >
          <div class="text-xl font-gbold my-2">{{ post?.title }}</div>
          <div class="text-sm">
            {{ post?.description?.substring(0, 50) }}...
          </div>
          <div
            class="text-myBlue text-xs inline-block mr-2"
            v-for="(tag, index) in post?.tags"
            :key="index"
          >
            {{ tag }}
          </div>
        </li>
      </div>
      <li class="pl-4 py-2 font-gregular" v-if="searchPosts.length === 0">
        No results for your query 😓
      </li>
    </ul>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import Icon from "./navIcons.vue";
import DropdownFocus from "./dropdownFocus.vue";
import { ref, watchEffect } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { originalPosts, updateFuse } from "../../composables/posts";
import { setUser } from "../../composables/auth";

export default {
  components: { DropdownFocus, Icon },
  setup() {
    const query = ref("");
    const searchPosts = ref([]);
    const mainPosts = ref([]);
    const searchResultsVisible = ref(false);
    const search = ref(null);
    const { immutablePosts } = originalPosts();
    const { generalUpdate, myUpdate, randomUserUpdate } = updateFuse();
    const { isLoggedIn } = setUser();

    const route = useRoute();
    let fuse = null;
    const options = {
      includeMatches: true,
      threshold: 0.5,
      location: 0,
      distance: 500,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["badgeName", "title", "description", "tags"],
    };

    const setPosts = () => {
      if (route.name === "generalPosts")
        mainPosts.value = immutablePosts.general;
      else if (route.name === "myPosts") mainPosts.value = immutablePosts.mine;
      else if (route.name === "randomUserPosts")
        mainPosts.value = immutablePosts.randomUser;
      fuse = new Fuse(mainPosts.value, options);
    };

    watchEffect(() => {
      if (isLoggedIn.value) {
        setPosts();
      }
    });

    const performSearch = () => {
      const result = fuse?.search(query.value);
      if (Array.isArray(result)) {
        if (!query.value.length) {
          searchPosts.value = mainPosts.value;
        } else searchPosts.value = result.map((i) => i.item);
      }
    };

    const fixSearch = () => {
      if (route.name === "generalPosts") generalUpdate(searchPosts.value);
      else if (route.name === "myPosts") myUpdate(searchPosts.value);
      else if (route.name === "randomUserPosts")
        randomUserUpdate(searchPosts.value);
      searchResultsVisible.value = false;
      query.value = "";
    };

    const showPost = (post) => {
      const p = [];
      p.push(post);
      if (route.name === "generalPosts") generalUpdate(p);
      else if (route.name === "myPosts") myUpdate(p);
      else if (route.name === "randomUserPosts") {
        console.log("random user i send", p);
        randomUserUpdate(p);
      }
      searchResultsVisible.value = false;
    };

    const showAll = () => {
      searchPosts.value = mainPosts.value;
      fixSearch();
    };

    const slashSearch = (e) => {
      if (e.key === "/") {
        search.value?.focus();
      }
    };

    onBeforeRouteUpdate(() => {
      searchPosts.value = [];
      searchResultsVisible.value = false;
    });

    return {
      query,
      searchResultsVisible,
      search,
      performSearch,
      slashSearch,
      searchPosts,
      mainPosts,
      fixSearch,
      showPost,
      setPosts,
      showAll,
    };
  },
};
</script>

<style></style>
