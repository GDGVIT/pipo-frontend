<template>
  <!-- Go back -->
  <router-link to="/user/profile">
    <Icon name="leftArrow" class="absolute top-6 left-10" />
  </router-link>
  <div class="font-glight">
    <!-- Introduction -->
    <div class="w-4/5 m-auto text-center">
      <div class="text-3xl font-gbold my-5">Interests</div>
      <div class="text-lg">
        Identify your interests and list them down here.
      </div>
    </div>
    <!-- Add your interest -->
    <div class="w-96 my-7 relative m-auto">
      <textarea
        class="shadow-md rounded-lg focus:outline-none resize-none p-5"
        cols="40"
        rows="3"
        placeholder="Enter your interest here.."
        v-model="newInterest"
      ></textarea>
      <Icon
        name="plus"
        class="absolute -bottom-2 right-0 streak-btn flex justify-items-center cursor-pointer"
        @click="addInterest()"
      />
    </div>
    <!-- Display interests -->
    <div class="px-10 relative">
      <!-- Delete all -->
      <Icon
        name="bin"
        class="absolute top-0 right-0"
        @click="deleteAllInterests()"
      />

      <!-- If no interests -->
      <div v-if="interests.hasOwnProperty('message')">
        {{ interests.message }}
      </div>
      <!-- If interests present -->
      <div
        class="inline-block bg-myRed text-white mr-3 rounded-md px-2 py-1 my-1"
        v-for="(interest, index) in interests"
        :key="index"
      >
        {{ interest }}
        <span @click="deleteInterest(interest)" class="ml-2 cursor-pointer"
          >x</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { mapState } from "vuex";
import api from "@/api";

export default {
  components: { Icon },
  computed: mapState({
    config: (state) => state.auth.config,
  }),
  data() {
    return {
      interests: [],
      newInterest: "",
    };
  },
  mounted() {
    this.getInterests();
  },
  methods: {
    async getInterests() {
      const res = await api.get("/tags", this.config);
      console.log(
        "Interests of the user obtained from the backend...",
        res.data
      );

      this.interests = res.data;
    },
    async addInterest() {
      try {
        await api.post("/tags", { tag: this.newInterest }, this.config);
        this.interests.push(this.newInterest);
        this.newInterest = "";
      } catch (error) {
        console.log("Error occured while adding new interest", error);
      }
    },
    async deleteInterest(interest) {
      try {
        const index = this.interests.indexOf(interest);
        const res = await api.delete("/tags", this.config, { arrIndex: index });
        console.log("Response for deleting the tag", res);
        this.interests.splice(index, 1);
      } catch (error) {
        console.log("Error occured while deleting the post", error);
      }
    },
    async deleteAllInterests() {
      try {
        const res = await api.delete("/tags/all", this.config);
        console.log("Response for deleting all tags from backend", res);

        this.interests = [];
      } catch (error) {
        console.log("Error occured while deleting all tags", error);
      }
    },
  },
};
</script>

<style></style>
