<template>
  <div
    class="grid grid-rows-5 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-4 font-gbold overflow-y-auto overflow-x-hidden h-full "
  >
    <!-- Profile -->
    <div
      class="row-span-4 sm:row-span-1 sm:col-span-1 grid grid-rows-3 bg-myRed text-white py-10"
    >
      <!-- Profile pic -->
      <div class="grid place-items-center">
        <div class="relative">
          <div v-if="profile?.user?.picture">
            <img
              class="w-32 h-32 rounded-full"
              :src="profile?.user?.picture"
              alt="profile-pic"
              referrerpolicy="no-referrer"
            />
          </div>
          <div v-if="!profile?.user?.picture">
            <Icon name="profileIcon" />
          </div>
          <div
            class="absolute top-2 right-0 bg-white text-myRed text-xs px-2 rounded-full"
          >
            20 pts
          </div>
        </div>
      </div>
      <!-- Profile details -->
      <div class="flex flex-col items-center p-2">
        <div
          class="relative w-full text-2xl md:text-3xl font-gbold text-center my-2 mx-auto flex break-all"
        >
          <label for="username" class="ml-2 absolute top-0 right-3">
            <Tooltip
              tooltipStyle="w-28"
              text="Edit username. 10 characters long with no spaces in lowercase"
            >
              <Icon name="editPencil" />
            </Tooltip>
          </label>
          <input
            @keydown="updatingUsername = true"
            v-click-outside="updateUsernameByClick"
            type="text"
            spellcheck="false"
            class="bg-myRed w-32 mx-auto text-center break-words focus:outline-none"
            v-model="usernameRef"
            autocomplete="off"
            id="username"
          />
        </div>
        <div class="font-glight py-3 px-2 w-full break-all text-center">
          {{ profile?.user?.email }}
        </div>
        <div
          class="font-gbold grid grid-cols-2 place-items-center gap-y-3 m-auto"
        >
          <div>Followers</div>
          <div class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs">
            {{ profile?.followers }}
          </div>

          <div>Following</div>
          <div class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs">
            {{ profile?.following }}
          </div>

          <div>Friends</div>
          <div class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs">
            {{ profile?.friends }}
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
          class="grid grid-cols-3 gap-3 lg:grid-cols-6 justify-items-center items-center mt-5 mb-10"
        >
          <div
            v-for="(badge, index) in completed"
            :key="index"
            class="w-20 grid place-items-center"
          >
            <div v-if="badge" class="grid place-items-center">
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
          v-if="noInProgress"
          class="p-10 bg-red-50 text-myRed font-gbold rounded-md my-5 mb-10"
        >
          Looks there's no progress recently😢. Start your journey today.🎲
          Simply add a post with a challenge you like 😍 and you will see your
          badge📛 being displayed here in progress waiting to be completed. Go
          try it out!
        </div>
        <div
          class="grid grid-cols-3 gap-3 lg:grid-cols-6 justify-items-center items-center mt-5 mb-10"
        >
          <div
            v-for="(badge, index) in inProgress"
            :key="index"
            class="w-20 grid place-items-center"
          >
            <div v-if="badge" class="grid place-items-center">
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
import { getProfile } from "../../../composables/profile";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "../../../composables/auth";
import { getUserBadges } from "../../../composables/badges";
import { getTodos, getInterests } from "../../../composables/activities";
import Tooltip from "../../../components/tooltips/tooltip";
import { useToast } from "vue-toastification";

export default {
  components: { Icon, Tooltip },
  setup() {
    const inProgress = ref([]);
    const completed = ref([]);
    const usernameRef = ref(null);
    const updatingUsername = ref(false);
    const noInProgress = ref(true);
    const noCompleted = ref(true);
    const toast = useToast();

    const { isLoggedIn } = setUser();
    const { profile, loadProfile, changeUserDetails } = getProfile();
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
        noInProgress.value = inp.length ? false : true;
        for (let i = 0; i < 6; i++) inProgress.value[i] = inp[i];
      }
    };

    const showCompleted = () => {
      const cp = getCompleted.value;
      if (cp) {
        noCompleted.value = cp.length ? false : true;
        for (let i = 0; i < 6; i++) completed.value[i] = cp[i];
      }
    };

    watchEffect(async () => {
      if (isLoggedIn.value) {
        // Load Profile
        await loadProfile();
        usernameRef.value = profile.value?.user?.userName;

        //Load Badges
        await loadInProgress();
        await loadCompleted();
        showInProgress();
        showCompleted();

        //loading activities
        await loadTodos();
        await loadInterests();
      }
    });

    const updateUsernameByClick = () => {
      if (updatingUsername.value) {
        let re = new RegExp("^[a-z0-9_@./#&+-]{1,10}$");

        const curr = profile.value?.user?.userName;
        const next = usernameRef.value;

        if (curr !== next) {
          if (re.test(next)) {
            changeUserDetails({ userName: next });
            updatingUsername.value = false;
          } else {
            toast.error("Username doesn't match the criteria.");
          }
        }
      }
    };

    return {
      profile,
      usernameRef,
      updatingUsername,
      updateUsernameByClick,
      inProgress,
      completed,
      todos5,
      interestList5,
      noInProgress,
      noCompleted,
    };
  },
};
</script>
