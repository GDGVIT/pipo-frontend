<template>
  <div class="post-container">
    <div class="post-details">
      <div class="user-details">
        <span class="username">@nicoline mark</span>
        <span class="streak">100</span>
      </div>
      <div class="upvote-details">
        <postSVG name="likeLight" />
        <span style="font-size:12px">1010</span>
      </div>
    </div>
    <div class="post-body">
      <div class="post-tags"></div>
      <div class="post-content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
        praesentium aliquam laboriosam magni suscipit animi maxime, tempora nemo
        culpa quo labore repellat quam odit iusto sequi error dolorem tenetur
        totam.
      </div>
      <img
        src="https://www.economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png"
        alt="code-img"
        style="width:100%"
      />
    </div>
  </div>
</template>
<script>
import postSVG from "./postSVG";
export default {
  name: "post",
  components: {
    postSVG,
  },
};
</script>
<style scoped>
.post-container {
  background-color: white;
  border: 2px solid black;
}

.upvote-details {
  display: flex;
  align-items: center;
}

.streak {
  width: 35px;
  height: 25px;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6666;
  color: white;
  margin-left: 10px;
}

.user-details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.username {
  font-family: Gilroy-Bold;
  font-size: 20px;
}

.post-details {
  padding: 20px 40px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-body {
  position: relative;
  padding: 10px 40px;
}

.post-content {
  font-size: 15px;
  margin-bottom: 15px;
}
</style>
