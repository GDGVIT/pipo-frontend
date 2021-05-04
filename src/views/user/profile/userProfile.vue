<template>
  <div
    class="h-full grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 lg:grid-cols-4 font-gbold"
  >
    <!-- Profile -->
    <div class="grid grid-cols-3 md:col-span-1 md:grid-rows-3 md:grid-cols-1">
      <!-- Profile pic -->
      <div class="col-span-1 md:row-span-1 grid place-items-center">
        <img
          class="w-32 h-32 rounded-full"
          :src="user?.picture"
          alt="profile-pic"
        />
      </div>
      <!-- Profile details -->
      <div
        class="col-span-2 md:col-span-1 md:row-span-2 flex flex-col items-center p-2"
      >
        <div class="text-xl md:text-3xl font-gbold text-center">
          @ {{ user.name ? user.name : "anonymous" }}
        </div>
        <div class="text-sm font-glight py-3">{{ user?.email }}</div>
        <div
          class="font-glight grid grid-cols-2 place-items-center w-2/3 m-auto"
        >
          <div>Followers</div>
          <div class="streak-btn ml-5 my-1 md:my-3 text-xs">
            {{ user.followers ? user.followers : 0 }}
          </div>

          <div>Following</div>
          <div class="streak-btn ml-5 my-1 md:my-3 text-xs">
            {{ user.following ? user.following : 0 }}
          </div>

          <div>Friends</div>
          <div class="streak-btn ml-5 my-1 md:my-3 text-xs">
            {{ user.friends ? user.friends : 0 }}
          </div>
        </div>
      </div>
    </div>
    <!-- Collection Display -->
    <div
      class="row-span-2 md:row-span-1 md:col-span-2 lg:col-span-3 overflow-y-auto font-glight pr-10"
    >
      <!-- Badges -->
      <div class="ml-5 my-3">
        <div class="flex justify-between items-center">
          <div class="my-3 font-gbold">Badges</div>
          <router-link to="/user/badges"
            ><RightArrow name="rightArrow"
          /></router-link>
        </div>
        <div class="inline-block">
          <div
            v-for="(badge, index) in badgesInfo"
            :key="index"
            class="w-20 inline-block"
          >
            <img
              :src="badge.badgePic"
              alt="badge-pic"
              :style="`border: 4px solid ${badge.badgeBorder}`"
              class="w-16 h-16 rounded-full"
            />
          </div>
        </div>
      </div>
      <hr />
      <!-- In Progress Badges -->
      <div class="ml-5 my-3">
        <div class="flex justify-between items-center">
          <div class="my-3 font-gbold">In Progress Badges</div>
          <router-link to="/user/in-progress"
            ><RightArrow name="rightArrow"
          /></router-link>
        </div>
        <div>
          <div
            v-for="(badge, index) in badgesInfo"
            :key="index"
            class="inline-block mr-4"
          >
            <img
              :src="badge.badgePic"
              alt="badge-pic"
              :style="`border: 4px solid ${badge.badgeBorder}`"
              class="w-16 h-16 rounded-full"
            />
          </div>
        </div>
      </div>
      <hr />
      <!-- Interests -->
      <div class="ml-5 my-3">
        <div class="flex justify-between items-center">
          <div class="my-3 font-gbold">Interests</div>
          <router-link to="/user/interests"
            ><RightArrow name="rightArrow"
          /></router-link>
        </div>
        <div v-if="interests.length === 0">Currently no interests lmao</div>
        <div
          v-for="(interest, index) in interests"
          :key="index"
          class="bg-myBlue text-white text-sm rounded-md inline-block px-2 py-1 mr-2 my-1"
        >
          {{ interest }}
        </div>
      </div>
      <hr />
      <!-- Todolist -->
      <div class="ml-5 my-3">
        <div class="flex justify-between items-center">
          <div class="my-3 font-gbold">TodoList</div>
          <router-link to="/user/todolist"
            ><RightArrow name="rightArrow"
          /></router-link>
        </div>
        <ul>
          <li
            class="my-2 text-sm"
            v-for="(todo, index) in todoList"
            :key="index"
          >
            ✔ {{ todo }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { generateIdenticon, stringToColor } from "../../../generate";
import RightArrow from "@/components/user/userIcons";
import { mapState } from "vuex";
import api from "@/api";

export default {
  components: { RightArrow },
  computed: mapState({
    user: (state) => state.user.user,
    config: (state) => state.auth.config,
  }),
  data() {
    return {
      badges: [
        "React",
        "Vue",
        "Angular",
        "Node.js",
        "Django",
        "C++",
        "Python",
        "Java",
      ],
      badgesInfo: [],
      interests: [],
      todoList: [],
    };
  },
  mounted() {
    this.badgesInfo = this.badges.map((badge) => {
      const badgeObj = {
        badgePic: generateIdenticon(badge),
        badgeBorder: stringToColor(badge),
      };
      return badgeObj;
    });
    console.log(this.badgesInfo);

    this.getInterests();
    this.getTodos();
  },
  methods: {
    async getInterests() {
      const res = await api.get("/tags", this.config);
      console.log(
        "Interests of the user obtained from the backend...",
        res.data
      );

      //show some 5 interests
      this.interests = res.data.splice(0, 5);
    },
    async getTodos() {
      const res = await api.get("/todo", this.config);
      console.log("Todos of the user obtained from backend...", res.data);

      //show 5 todos
      this.todoList = res.data.splice(0, 5);
    },
  },
};
</script>

<style></style>
