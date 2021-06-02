<template>
  <div
    class="grid grid-rows-5 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-4 font-gbold overflow-y-auto h-full "
  >
    <!-- Profile -->
    <div
      class="row-span-4 sm:row-span-1 sm:col-span-1 grid grid-rows-3 bg-myRed text-white py-10"
    >
      <!-- Profile pic -->
      <div class="grid place-items-center">
        <div v-if="profile?.picture">
          <img
            class="w-32 h-32 rounded-full"
            :src="profile?.picture"
            alt="profile-pic"
            referrerpolicy="no-referrer"
          />
        </div>
        <div v-if="!profile?.picture">
          <Icon name="profileIcon" />
        </div>
      </div>
      <!-- Profile details -->
      <div class="flex flex-col items-center p-2">
        <div
          class="text-2xl md:text-3xl font-gbold text-center my-2 mx-auto flex break-all"
        >
          <span class="mr-2">@</span>
          <span
            @keydown="updatingUsername = true"
            @keydown.enter="updateUsername"
            v-click-outside="updateUsernameByClick"
            role="textbox"
            type="text"
            spellcheck="false"
            class="bg-myRed text-center break-words focus:outline-none"
            ref="usernameRef"
            contenteditable="true"
            >{{ profile?.userName }}
          </span>
          <label for="username">
            <Icon name="editPencil" />
          </label>
        </div>
        <div class="font-glight py-3 px-2 w-full break-all text-center">
          {{ profile?.email }}
        </div>
        <div
          class="font-gbold grid grid-cols-2 place-items-center gap-y-3 m-auto"
        >
          <div>Followers</div>
          <div class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs">
            {{ followersCount }}
          </div>

          <div>Following</div>
          <div class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs">
            {{ followingCount }}
          </div>

          <div>Friends</div>
          <div class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs">
            {{ friendsCount }}
          </div>
        </div>
      </div>
    </div>
    <!-- Collection Display -->
    <div
      class="row-span-1 sm:row-span-1 sm:col-span-2 lg:col-span-3 sm:overflow-y-auto font-glight px-5 md:px-10 pt-10"
    >
      <!-- Badges -->
      <div class="ml-5">
        <div class="flex justify-between items-center">
          <div class="py-3 font-gbold text-lg">
            Completed Badges
          </div>
          <router-link to="/user/badges"><Icon name="rightArrow"/></router-link>
        </div>
        <div
          class="grid grid-cols-3 gap-3 lg:grid-cols-6 justify-items-center items-start mt-5 mb-10"
        >
          <div
            v-for="(badge, index) in completed"
            :key="index"
            class="w-20 inline-block"
          >
            <div v-if="badge">
              <img :src="badge?.identicon" alt="badge-pic" class="w-16 h-16" />
              <span class="text-xs font-gbold">{{ badge?.badgeName }}</span>
            </div>
            <div
              v-else
              class="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full"
            ></div>
          </div>
        </div>
      </div>
      <hr />
      <!-- In Progress Badges -->
      <div class="ml-5 pt-6">
        <div class="flex justify-between items-center">
          <div class="py-3 font-gbold text-lg">In Progress Badges</div>
          <router-link to="/user/in-progress"
            ><Icon name="rightArrow"
          /></router-link>
        </div>
        <div
          class="grid grid-cols-3 gap-3 lg:grid-cols-6 justify-items-center items-start mt-5 mb-10"
        >
          <div
            v-for="(badge, index) in inProgress"
            :key="index"
            class="w-16 text-center"
          >
            <div v-if="badge">
              <img :src="badge?.identicon" alt="badge-pic" class="w-16 h-16" />
              <span class="text-xs font-gbold">{{ badge?.badgeName }}</span>
            </div>
            <div
              v-else
              class="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full"
            ></div>
          </div>
        </div>
      </div>
      <hr />
      <!-- Interests -->
      <div class="ml-5 pt-6 overflow-x-hidden">
        <div class="flex justify-between items-center">
          <div class="py-3 font-gbold text-lg">Interests</div>
          <router-link to="/user/interests"
            ><Icon name="rightArrow"
          /></router-link>
        </div>
        <div
          v-if="interestList5.length === 0"
          class="text-myRed text-sm font-gbold pt-5 pb-10"
        >
          No Interests as of now. 😢
        </div>
        <div v-else class="pt-5 pb-10">
          <div
            v-for="(interest, index) in interestList5"
            :key="index"
            class="text-myRed border-2 border-myRed font-gbold text-sm rounded-md inline-block px-2 py-1 mr-2 my-1"
          >
            {{ interest }}
          </div>
        </div>
      </div>
      <hr />
      <!-- Todolist -->
      <div class="ml-5 pt-6">
        <div class="flex justify-between items-center">
          <div class="py-3 font-gbold text-lg">TodoList</div>
          <router-link to="/user/todolist"
            ><Icon name="rightArrow"
          /></router-link>
        </div>

        <div
          v-if="todos5.length === 0"
          class="text-myRed font-gbold text-sm pt-5 pb-10"
        >
          No Todos as of now. 😢
        </div>
        <div v-else class="w-4/5 pt-5 pb-10">
          <div
            class="my-2 px-3 py-2 bg-red-50 text-myRed rounded-md grid grid-cols-12 items-baseline"
            v-for="(todo, index) in todos5"
            :key="index"
          >
            <Icon name="tick" />
            <span class="col-span-11 font-gbold">{{ todo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { getProfile, socialCircle } from "../../../composables/profile";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "../../../composables/auth";
import { getUserBadges } from "../../../composables/badges";
import { getTodos, getInterests } from "../../../composables/activities";

export default {
  components: { Icon },
  setup() {
    const inProgress = ref([]);
    const completed = ref([]);
    const usernameRef = ref(null);
    const updatingUsername = ref(false);

    const { isLoggedIn } = setUser();
    const { profile, loadProfile, changeUserDetails } = getProfile();
    const {
      loadFollowers,
      loadFollowing,
      followersCount,
      followingCount,
      friendsCount,
    } = socialCircle();
    const {
      loadInProgress,
      loadCompleted,
      getInProgress,
      getCompleted,
    } = getUserBadges();
    const { loadTodos, todos5 } = getTodos();
    const { loadInterests, interestList5 } = getInterests();

    onMounted(() => {
      for (let i = 0; i < 6; i++) {
        inProgress.value.push(null);
        completed.value.push(null);
      }
    });

    const showInProgress = () => {
      const inp = getInProgress.value;
      if (inp) {
        for (let i = 0; i < 6; i++) inProgress.value[i] = inp[i];
      }
    };

    const showCompleted = () => {
      const cp = getCompleted.value;
      if (cp) {
        for (let i = 0; i < 6; i++) completed.value[i] = cp[i];
      }
    };

    watchEffect(async () => {
      if (isLoggedIn.value) {
        // Load Profile
        await loadProfile();

        //Load Badges
        await loadInProgress();
        await loadCompleted();
        showInProgress();
        showCompleted();

        //loading social circle
        await loadFollowing();
        await loadFollowers();

        //loading activities
        await loadTodos();
        await loadInterests();
      }
    });

    const updateUsername = () => {
      changeUserDetails({ userName: usernameRef.value.textContent });
      updatingUsername.value = false;
    };

    const updateUsernameByClick = () => {
      if (updatingUsername.value) {
        changeUserDetails({ userName: usernameRef.value.textContent });
        updatingUsername.value = false;
      }
    };

    return {
      profile,
      updateUsername,
      usernameRef,
      updatingUsername,
      updateUsernameByClick,
      followersCount,
      followingCount,
      friendsCount,
      inProgress,
      completed,
      todos5,
      interestList5,
    };
  },
};
</script>

<style scoped>
::-webkit-scrollbar-thumb {
  background-color: #ff6666;
  border-radius: 0px;
}
</style>
