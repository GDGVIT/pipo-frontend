<template>
  <!-- Arrows -->
  <svg
    v-if="name === 'rightArrow' || name === 'leftArrow'"
    xmlns="http://www.w3.org/2000/svg"
    class="w-7 p-2 mr-10 cursor-pointer bg-myRed text-white rounded-full"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="[name === 'rightArrow' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7']"
    />
  </svg>
  <!-- Plus -->
  <svg
    v-else-if="name === 'plus'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
  <!-- Bin -->
  <svg
    v-else-if="name === 'bin'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-8 w-8 p-2 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
  <!-- Profile Icon -->
  <svg
    class="w-32 h-32 rounded-full mx-4"
    v-else-if="name === 'profileIcon'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44 44"
  >
    <g transform="translate(1.5 1.5)">
      <circle
        style="fill: #fff"
        class="a"
        cx="20.5"
        cy="20.5"
        r="20.5"
        transform="translate(0)"
      />
      <circle
        style="fill: #fff"
        class="a"
        cx="20.5"
        cy="20.5"
        r="20.5"
        transform="translate(0)"
      />
      <g transform="translate(0 0)">
        <circle
          class="b"
          style="fill: #fff; stroke: #000; stroke-width: 3px"
          cx="20.5"
          cy="20.5"
          r="20.5"
          transform="translate(0)"
        />
      </g>
      <path
        class="c"
        d="M102.971,206.228c1.911-8.314,7.88-18.228,14.949-18.228s13.038,9.914,14.949,18.228a21,21,0,0,1-29.9,0Z"
        transform="translate(-96.831 -170.479)"
      />
      <path
        class="d"
        style="fill: #fff; fill-rule: evenodd"
        d="M124.146,257.546c1.846-7.871,6.95-17.576,12.326-10.645,3.987-7.634,11.368,2.8,12.729,10.188a21.007,21.007,0,0,1-25.055.457Z"
        transform="translate(-115.278 -219.466)"
      />
      <path
        class="e"
        style="fill: #f66"
        d="M209.285,330H206l1.8,5.669Z"
        transform="translate(-186.586 -294.184)"
      />
      <ellipse cx="2" cy="5" rx="2" ry="5" transform="translate(13 28)" />
      <ellipse cx="2" cy="5" rx="2" ry="5" transform="translate(13 28)" />
      <ellipse cx="2.5" cy="5" rx="2.5" ry="5" transform="translate(24 28)" />
      <ellipse cx="2.5" cy="5" rx="2.5" ry="5" transform="translate(24 28)" />
      <circle
        class="a"
        style="fill: #fff"
        cx="2"
        cy="2"
        r="2"
        transform="translate(13 32)"
      />
      <ellipse
        class="a"
        style="fill: #fff"
        cx="1"
        cy="2"
        rx="1"
        ry="2"
        transform="translate(26 32)"
      />
      <ellipse
        class="a"
        style="fill: #fff"
        cy="2"
        ry="2"
        transform="translate(17 28)"
      />
      <ellipse
        class="a"
        style="fill: #fff"
        cy="2"
        ry="2"
        transform="translate(28 28)"
      />
      <path
        class="f"
        style="stroke: #000"
        d="M184.188,157.935c.775.966,3.221,4.144,4.767,5.218-.472.494-2.319,1.044-5.926-.709s-2.965-5.411-1.868-4.252,2.383,2.985,3.929,3.414C183.8,160.731,183.413,156.969,184.188,157.935Z"
        transform="translate(-164.197 -144.15)"
      />
    </g>
  </svg>
  <!-- Edit Pencil -->
  <svg
    v-else-if="name === 'editPencil'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5 cursor-pointer"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
    />
  </svg>
  <!-- Hashtag -->
  <svg
    v-else-if="name === 'tick'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5 pt-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M5 13l4 4L19 7"
    />
  </svg>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style></style>
