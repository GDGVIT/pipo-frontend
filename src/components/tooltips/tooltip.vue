<template>
  <div :class="['tooltip-box', boxStyle]">
    <slot />
    <div
      :class="[
        'tooltip py-2 bg-myBlue text-white font-glight text-xs break-normal rounded-sm',
        tooltipStyle,
      ]"
    >
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    boxStyle: {
      type: String,
    },
    tooltipStyle: {
      type: String,
    },
    alignment: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip {
  opacity: 1;
}

.tooltip {
  text-align: center;
  opacity: 0;
  transition: opacity 1s;

  position: absolute;
  z-index: 1;
  transform: translate(-50%, -130%);
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #4b69aa transparent transparent transparent;
}

/*  */
</style>
