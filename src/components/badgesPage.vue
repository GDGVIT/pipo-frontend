<template>
  <!-- badges constantly change hence its better to have data on badges in firebase -->
  <div class="badges-container">
    <div class="title">Badges</div>
    <div class="about">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe asperiores
      repellendus provident est reiciendis ab deleniti, a corrupti. Nesciunt,
      enim.
    </div>
    <div class="streak">
      <div class="sub-title">With Streak Recovery</div>
      <div class="badge-container">
        <div v-for="badge in badges" :key="badge.id">
          <BadgeSVG name="medal" class="badge" />
        </div>
      </div>
    </div>
    <div class="without-streak">
      <div class="sub-title">Without Streak Recovery</div>
      <div class="badge-container">
        <div v-for="badge in badges" :key="badge.id">
          <BadgeSVG name="medal" class="badge" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BadgeSVG from "./modules/badges/badgesSVG";
export default {
  name: "badge-page",
  data() {
    return {
      badges: [
        {
          badgeId: "0c35c5d7-6757-4b41-96e2-6587ef4f0282",
          badgeName: "pipo1",
          days: 30,
          badgeImgUrl: "bitly",
          upvotes: 20,
        },
        {
          badgeId: "0c35c5d7-6757-4b41-96e2-6587eg4f0282",
          badgeName: "pipo1",
          days: 30,
          badgeImgUrl: "bitly",
          upvotes: 20,
        },
        {
          badgeId: "0c35c5d7-6757-4b41-96e2-6587eh4f0282",
          badgeName: "pipo1",
          days: 30,
          badgeImgUrl: "bitly",
          upvotes: 20,
        },
        {
          badgeId: "0c35c5d7-6757-4b41-96e2-6587ei4f0282",
          badgeName: "pipo1",
          days: 30,
          badgeImgUrl: "bitly",
          upvotes: 20,
        },
        {
          badgeId: "0c35c5d7-6757-4b41-96e2-6587ej4f0282",
          badgeName: "pipo1",
          days: 30,
          badgeImgUrl: "bitly",
          upvotes: 20,
        },
        {
          badgeId: "0c35c5d7-6757-4b41-96e2-6587ek4f0282",
          badgeName: "pipo1",
          days: 30,
          badgeImgUrl: "bitly",
          upvotes: 20,
        },
      ],
    };
  },
  components: {
    BadgeSVG,
  },
};
</script>
<style scoped>
.badge-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
}

.badge {
  width: 60px;
}
</style>
