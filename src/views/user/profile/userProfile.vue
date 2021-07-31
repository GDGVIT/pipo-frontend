<template>
  <div
    class="grid grid-rows-5 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-4 font-gbold overflow-y-auto overflow-x-hidden h-full"
  >
    <!-- Profile -->
    <div
      class="row-span-4 sm:row-span-1 sm:col-span-1 grid grid-rows-3 bg-myRed text-white py-10"
    >
      <!-- Profile pic -->
      <div class="grid place-items-center relative">
        <div @click="showPointsInfo = true" class="absolute top-2 right-2">
          <Icon name="info" />
        </div>
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
            {{ profile?.user?.points }} pts
          </div>
        </div>
      </div>
      <!-- Profile details -->
      <div class="flex flex-col items-center p-2">
        <div
          class="relative w-full text-2xl md:text-3xl font-gbold text-center my-2 mx-auto flex break-all"
        >
          <label
            v-if="!updatingUsername"
            for="username"
            class="ml-2 absolute top-0 right-3"
            data-aos="fade-left"
          >
            <Popper :hover="true" placement="top">
              <button>
                <label for="username">
                  <Icon name="editPencil" />
                </label>
              </button>
              <template #content>
                <div
                  class="w-32 font-glight text-xs bg-myBlue p-2 break-normal rounded-md"
                >
                  Edit username. 10 characters long with no spaces in lowercase
                </div>
              </template>
            </Popper>
          </label>
          <div
            @click="updateUsernameByClick"
            v-if="updatingUsername"
            data-aos="fade-left"
            class="ml-2 absolute top-2 right-3 cursor-pointer w-10 h-10"
          >
            <Icon name="tick" />
          </div>
          <input
            @keydown="updatingUsername = true"
            type="text"
            spellcheck="false"
            class="bg-myRed w-40 mx-auto text-center break-words focus:outline-none"
            v-model="usernameRef"
            autocomplete="off"
            id="username"
          />
        </div>
        <div class="font-glight py-6 px-2 w-full break-all text-center">
          {{ profile?.user?.email }}
        </div>
        <div class="font-gbold grid gap-y-6 m-auto">
          <router-link :to="{ name: 'followers' }">
            <div class="grid grid-cols-2 place-items-center">
              <div>Followers</div>
              <div
                class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs"
              >
                {{ profile?.followers }}
              </div>
            </div>
          </router-link>

          <router-link :to="{ name: 'following' }">
            <div class="grid grid-cols-2 place-items-center">
              <div>Following</div>
              <div
                class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs"
              >
                {{ profile?.following }}
              </div>
            </div>
          </router-link>
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
          <router-link :to="{ name: 'completedBadges' }"
            ><Icon name="rightArrow"
          /></router-link>
        </div>
        <div
          v-if="noCompleted"
          class="p-10 bg-red-50 text-myRed font-gbold rounded-md my-5 mb-10"
        >
          No badges earned so far. Add posts daily to maintain the streak and
          one day you will see the badges appear here.
          <router-link :to="{ name: 'myPosts' }">
            <u>Forget to post one today?. Do it now!</u>
          </router-link>
          😁
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
              <router-link
                :to="{
                  name: 'calendar',
                  params: {
                    challengeId: `${badge?.badgeId}`,
                  },
                }"
              >
                <img
                  :src="badge?.identicon"
                  alt="badge-pic"
                  class="w-16 h-16"
                />
              </router-link>
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
          <router-link :to="{ name: 'inProgressBadges' }"
            ><Icon name="rightArrow"
          /></router-link>
        </div>
        <div
          v-if="noInProgress"
          class="p-10 bg-red-50 text-myRed font-gbold rounded-md my-5 mb-10"
        >
          Looks there's no progress recently😢. Start your journey today.🎲
          Simply add a post with a challenge you like 😍 and you will see your
          badge being displayed here in progress waiting to be completed. Go try
          it out!
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
              <router-link
                :to="{
                  name: 'calendar',
                  params: {
                    challengeId: `${badge?.badgeId}`,
                  },
                }"
              >
                <img
                  :src="badge?.identicon"
                  alt="badge-pic"
                  class="w-16 h-16"
                />
              </router-link>
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
          <router-link :to="{ name: 'interests' }"
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
          <router-link :to="{ name: 'todolist' }"
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
            class="my-2 px-3 py-2 bg-red-50 text-myRed rounded-md flex items-center"
            v-for="(todo, index) in todos5"
            :key="index"
          >
            <div class="px-2">
              <Icon name="tick" />
            </div>
            <span class="col-span-11 font-gbold">{{ todo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <InfoModal
    @close="showPointsInfo = false"
    v-if="showPointsInfo"
    modal="pointsInfo"
  />
</template>

<script>
import Icon from "@/components/user/userIcons";
import InfoModal from "@/components/modals/userRelatedInfoModal";
import { getProfile } from "@/composables/profile";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "@/composables/auth";
import { getUserBadges } from "@/composables/badges";
import { getTodos, getInterests } from "@/composables/activities";
import { useToast } from "vue-toastification";
import { checkUserName } from "@/composables/posts";

export default {
  components: {
    Icon,
    InfoModal,
  },
  setup() {
    const inProgress = ref([]);
    const completed = ref([]);
    const usernameRef = ref(null);
    const updatingUsername = ref(false);
    const noInProgress = ref(true);
    const noCompleted = ref(true);

    const showPointsInfo = ref(false);

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
        const curr = profile.value?.user?.userName;
        const next = usernameRef.value;
        if (curr !== next) {
          if (checkUserName(next)) {
            changeUserDetails({ userName: next });
            updatingUsername.value = false;
          } else {
            toast.warning("Username doesn't match the criteria 🤔.");
          }
        } else {
          toast.warning("It's the same username 🤨");
          updatingUsername.value = false;
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
      showPointsInfo,
    };
  },
};
</script>
