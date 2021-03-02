<template>
  <!-- done -->
  <div class="title">Error 404</div>
  <h1>Not Found</h1>
  <div class="content">PiPo couldn't find the page you're looking for 😓</div>
  <loginSVG name="pipoPenguin" class="pipo-penguin" />
</template>
<script>
import loginSVG from "./modules/login/loginSVG";
export default {
  name: "not-found",
  components: {
    loginSVG,
  },
};
</script>
<style scoped>
.title {
  font-size: 70px;
  font-family: Gilroy-Bold;
  text-align: center;
  padding-top: 30px;
}
h1 {
  font-family: Gilroy-Bold;
  text-align: center;
  font-size: 50px;
}
.content {
  width: 60%;
  margin: 0 auto;
  font-size: 30px;
  text-align: center;
}
.pipo-penguin {
  position: absolute;
  margin-left: 50%;
  margin-top: 30vh;
  transform: translate(-50%, -50%);
}
</style>
