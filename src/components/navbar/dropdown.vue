<template>
  <div class="relative w-full md:w-l3 mx-4">
    <DropdownFocus @keyup="slashSearch" />
    <div class="flex items-center">
      <Popper :hover="true" placement="bottom">
        <button class="enlarge">
          <Icon name="info" />
        </button>
        <template #content>
          <div
            class="w-36 font-glight relative text-xs bg-myBlue text-white p-2 break-normal rounded-md"
          >
            <li class="list-disc">
              Type '/all' for all posts
            </li>
            <li class="list-disc">
              Click on tag of a post to search based on tags
            </li>
          </div>
        </template>
      </Popper>
      <input
        type="text"
        v-model="query"
        @blur="searchResultsVisible = false"
        @focus="searchResultsVisible = true"
        @keydown.esc="searchResultsVisible = false"
        @input="searchResultsVisible = true"
        @keyup="performSearch()"
        @keyup.up.prevent="highlightPrevious"
        @keydown.down.prevent="highlightNext"
        @keydown.enter="showPostAtIndex(highlightedIndex)"
        class="pl-4 border-b-2 w-full py-1 focus:outline-none font-glight"
        placeholder="Search (Press / to focus)"
        ref="search"
      />
      <div @click="fixSearch()">
        <Popper :hover="true" placement="bottom">
          <button class="enlarge">
            <Icon name="search" />
          </button>
          <template #content>
            <div
              class="w-24 font-glight relative text-xs bg-myBlue text-white p-2 break-normal rounded-md text-center"
            >
              Find posts matching the criteria
            </div>
          </template>
        </Popper>
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
      <div ref="results" class="overflow-y-auto max-h-48">
        <li
          :class="[
            highlightedIndex === index ? 'bg-gray-100' : '',
            'pl-4 py-2 font-glight cursor-pointer hover:bg-gray-100 border-b border-myBlue',
          ]"
          v-for="(post, index) in searches"
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
            # {{ tag }}
          </div>
        </li>
      </div>
      <li class="pl-4 py-2 font-glight" v-if="searches.length === 0">
        No results for your query 😓
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "./navIcons.vue";
import DropdownFocus from "./dropdownFocus.vue";
import { ref, watchEffect } from "vue";
import { setUser } from "@/composables/auth";
import { fuzzySearch } from "@/composables/fuzzySearch";

export default {
  components: { DropdownFocus, Icon },
  setup() {
    const {
      query,
      searches,
      searchResultsVisible,
      setPosts,
      performSearch,
      fixSearch,
      showAll,
      showPost,
      showPostAtIndex,
    } = fuzzySearch();
    const { isLoggedIn } = setUser();

    // for toggling and moving up and down using keyboard
    const results = ref(null);
    const highlightedIndex = ref(0);
    const search = ref(null);

    watchEffect(() => {
      if (isLoggedIn.value) setPosts();
    });

    // For accessibility through keyboard

    const highlightNext = () => {
      if (highlightedIndex.value < searches.value.length - 1) {
        highlightedIndex.value++;
        scrollToView();
      }
    };

    const highlightPrevious = () => {
      if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
        scrollToView();
      }
    };

    const scrollToView = () => {
      results.value?.children[highlightedIndex.value].scrollIntoView({
        block: "nearest",
      });
    };

    const slashSearch = (e) => {
      if (e.key === "/") {
        search.value?.focus();
      }
    };

    return {
      query,
      searches,
      searchResultsVisible,
      search,
      performSearch,
      fixSearch,
      showPost,
      showAll,
      showPostAtIndex,
      slashSearch,
      highlightedIndex,
      highlightNext,
      highlightPrevious,
      results,
    };
  },
};
</script>

<style></style>
