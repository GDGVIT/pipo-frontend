<template>
  <div class="made-with-love">
    <span class="content">Made with</span>
    <svg class="love" xmlns="http://www.w3.org/2000/svg" width="30" height="31">
      <g class="heart">
        <path
          class="b"
          d="M18,6.05a3.8,3.8,0,0,1,2.8,1.2,3.85,3.85,0,0,1,1.2,2.8c0,1.05-.65,2.25-1.95,3.7L13,21.25l-7.05-7.5C4.65,12.3,4,11.1,4,10.05a3.85,3.85,0,0,1,1.2-2.8A3.8,3.8,0,0,1,8,6.05,4.365,4.365,0,0,1,11.25,8.3l1.3,2.2a.55.55,0,0,0,.9,0l1.3-2.2A4.365,4.365,0,0,1,18,6.05M18,4a6.464,6.464,0,0,0-5,3.25A6.464,6.464,0,0,0,8,4,6,6,0,0,0,3.75,5.8,5.95,5.95,0,0,0,2,10.05c0,2.05,1.35,3.8,2.5,5.1l8.15,8.7a.5.5,0,0,0,.7,0l8.15-8.7c1.15-1.3,2.5-3.05,2.5-5.1A6.05,6.05,0,0,0,18,4Z"
          transform="translate(0,2)"
        />
      </g>
    </svg>
    <span class="content">by DSC VIT</span>
  </div>
</template>
<script>
export default {
  name: "made-with-love",
};
</script>
<style scoped>
.made-with-love {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Gilroy-Bold;
  color: #b1b1b1;
  font-size: 20px;
}
.content {
  padding: 5px;
}
.b {
  fill: #b1b1b1;
  stroke: #b1b1b1;
  stroke-width: 1.5px;
}
</style>
