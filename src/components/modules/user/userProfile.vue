<template>
  <header>
    <img
      v-if="userProfile.photoURL"
      :src="userProfile.photoURL"
      alt="profile-pic"
    />
    <!-- <UserSVG v-if="!userProfile.photoURL" name="user" /> -->
    <span>@{{ userProfile.username }}</span>
    <!-- <UserSVG name="edit" /> -->
  </header>
  <main>
    <div class="details">
      <div class="left">
        <ul>
          <li>Username : {{ userProfile.username }}</li>
          <li>Email : {{ userProfile.email }}</li>
          <li>
            <router-link to="/user/completed-badges"
              >Completed Badges</router-link
            >
          </li>
          <li>
            <router-link to="/user/in-progress-badges"
              >In Progress Badges</router-link
            >
          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </main>
</template>

<script>
//oauth whatever we get show here
export default {
  name: "user-page",
  components: {},
  data() {
    return {
      userProfile: {
        username: "Sai Teja T",
        email: "saitejareddytileti@gmail.com",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GgW8OnoGpycEgKFsN1Fvnl6nONwKhXSi2VboLv_Iw=s96-c",
      },
      tags: [],
      todo: [],
    };
  },
};
</script>

<style scoped></style>
