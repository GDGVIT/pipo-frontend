<template>
  <!-- badges constantly change hence its better to have data on badges in firebase -->
  <div class="container">
    <div class="title">Badges</div>
    <div class="about">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe asperiores
      repellendus provident est reiciendis ab deleniti, a corrupti. Nesciunt,
      enim.
    </div>
    <div class="streak">
      <div class="sub-title">With Streak Recovery</div>
      <div class="badge-container">
        <div class="badge" v-for="index in 1" :key="index">
          <BadgeSVG name="medal" class="badge-icon" />
          <div class="badge-name">Vue.js</div>
        </div>
      </div>
    </div>
    <div class="without-streak">
      <div class="sub-title">Without Streak Recovery</div>
      <div class="badge-container">
        <!-- <div class="badge" v-for="index in 1" :key="index">
          <BadgeSVG name="medal" class="badge-icon" />
          <div class="badge-name">Vue.js</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import BadgeSVG from "../../components/badges/badgesSVG";
export default {
  name: "badge-page",
  components: {
    BadgeSVG,
  },
};
</script>
<style scoped>
.container {
  width: 90%;
  box-sizing: border-box;
  background-color: white;
  margin: 15vh auto;
  padding: 15px 20px;
}

.title {
  font-family: Gilroy-Bold;
  font-size: 30px;
  margin: 30px 0;
}

.badge-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-gap: 10px;
}

.streak,
.without-streak {
  margin-top: 30px;
  height: 390px;
  overflow: scroll;
}

.badge {
  text-align: center;
  border-radius: 20px;
  background-color: rgb(248, 248, 248);
  padding: 10px;
}

.sub-title {
  font-family: Gilroy-Bold;
  font-size: 17px;
  margin-bottom: 12px;
}

.badge-icon {
  width: 60px;
}
</style>
