<template>
  <!-- Profile Icon -->
  <svg
    class="w-12 h-12 rounded-full"
    v-if="name === 'profileIcon'"
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
  <!-- Notifications Icon -->
  <svg
    v-if="name === 'notificationsIcon'"
    class="w-6 h-6 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 54.377 54.377"
    fill="currentColor"
  >
    <g transform="matrix(0.875, -0.485, 0.485, 0.875, 0, 19.392)">
      <rect />
      <g transform="translate(2.5 1.667)">
        <path
          d="M34.167,22.5a3.75,3.75,0,0,1-1-2.417V16.5c0-6.75-4.5-12.5-12.5-12.5s-12.5,5.583-12.5,12.5v4.167a2.167,2.167,0,0,1-.583,1.417L4.5,25.167A1.667,1.667,0,0,0,4,26.333v6A1.667,1.667,0,0,0,5.667,34h9.25a5.833,5.833,0,0,0,11.5,0h9.25a1.667,1.667,0,0,0,1.667-1.667v-6a1.667,1.667,0,0,0-.5-1.167ZM34,30.667H7.333V27.083l2.583-2.667a5.333,5.333,0,0,0,1.583-3.75V16.5c0-4.417,2.417-9.167,9.167-9.167s9.167,4.917,9.167,9.167v3.583a7.167,7.167,0,0,0,1.917,4.75L34,27.083Z"
          transform="translate(-3.166 -2.333)"
        />
        <path
          d="M6.333,16.177A14.25,14.25,0,0,1,11.75,5.01a1.667,1.667,0,0,0,.333-2.333,1.667,1.667,0,0,0-2.333-.25A17.167,17.167,0,0,0,3,16.177a1.667,1.667,0,0,0,3.333,0Z"
          transform="translate(-3 -2.01)"
        />
        <path
          d="M36.367,2.333a1.667,1.667,0,1,0-2,2.667,14.083,14.083,0,0,1,5.417,11.167,1.667,1.667,0,0,0,3.333,0,17.417,17.417,0,0,0-6.75-13.833Z"
          transform="translate(-8.116 -2)"
        />
      </g>
    </g>
  </svg>
  <!-- hamburger Icon -->
  <svg
    :class="[
      open ? 'opened' : '',
      'w-6 h-6 cursor-pointer mx-2 transition duration-500 xl:hidden',
    ]"
    @click="$emit('show')"
    v-if="name === 'hamburger'"
    viewBox="0 0 100 100"
  >
    <path
      class="line line1"
      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
    />
    <path class="line line2" d="M 20,50 H 80" />
    <path
      class="line line3"
      d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
    />
  </svg>
  <!-- Logo -->
  <svg
    v-else-if="name === 'pipoLogo'"
    xmlns="http://www.w3.org/2000/svg"
    width="208.053"
    height="77.765"
    viewBox="0 0 208.053 77.765"
    class="w-20 mx-4"
  >
    <g transform="translate(-48.48 -56.611)">
      <path
        class="a"
        style="fill: #f66"
        d="M157.435,434.382q12.988-1.053,12.988-7.529,0-2.107-2.435-3.265a13.4,13.4,0,0,0-6.088-1.211l-4.175.316Q157.434,424.589,157.435,434.382Zm.579,18.164a5.306,5.306,0,0,1-2.551.895,16.755,16.755,0,0,1-3.189.369,6.036,6.036,0,0,1-2.145-.316l.348-30.379a8.549,8.549,0,0,1-1.565-2.79,11.441,11.441,0,0,1-.7-2.37q0-.474.116-.579a19.515,19.515,0,0,1,3.711-.316q3.6-.21,7.19-.21a51,51,0,0,1,6.495.368,30.23,30.23,0,0,1,5.8,1.369,9.971,9.971,0,0,1,4.755,3,7.428,7.428,0,0,1,1.8,5.16,8.965,8.965,0,0,1-2.145,5.792,13.617,13.617,0,0,1-5.1,4,37.713,37.713,0,0,1-11.248,3.476l-2.145.21Q157.666,450.967,158.014,452.546ZM185.131,420.8a3.606,3.606,0,0,1,2.609.948,3.277,3.277,0,0,1,.985,2.475,3.325,3.325,0,0,1-1.333,2.633,4.433,4.433,0,0,1-2.9,1.053,3.649,3.649,0,0,1-2.551-.895,3.534,3.534,0,0,1,.348-5.107A4.235,4.235,0,0,1,185.131,420.8Zm2.957,13.109-.115,8.53a56.691,56.691,0,0,0,.232,6.055,8.167,8.167,0,0,0,1.508,3.58q0,.527-2.378,1.685a9.646,9.646,0,0,1-4.058,1.158q-.522,0-1.044-1.579a15.7,15.7,0,0,1-.7-3q-.116-1.422-.115-9.582t.405-8.9q1.334-.948,4.7-.948,1.334,0,1.624.316Zm14.306.474q12.988-1.053,12.988-7.529,0-2.107-2.435-3.265a13.4,13.4,0,0,0-6.088-1.211l-4.175.316Q202.395,424.589,202.395,434.382Zm.58,18.164a5.309,5.309,0,0,1-2.551.895,16.748,16.748,0,0,1-3.189.369,6.039,6.039,0,0,1-2.145-.316l.348-30.379a8.548,8.548,0,0,1-1.566-2.79,11.416,11.416,0,0,1-.7-2.37q0-.474.115-.579A19.528,19.528,0,0,1,197,417.06q3.595-.21,7.19-.21a50.981,50.981,0,0,1,6.494.368,30.23,30.23,0,0,1,5.8,1.369,9.964,9.964,0,0,1,4.755,3,7.424,7.424,0,0,1,1.8,5.16,8.961,8.961,0,0,1-2.145,5.792,13.614,13.614,0,0,1-5.1,4,37.717,37.717,0,0,1-11.249,3.476l-2.145.21Q202.626,450.967,202.975,452.546Zm47.558-11.267a12.466,12.466,0,0,1-3.363,8.687,11.616,11.616,0,0,1-9.045,3.633q-5.683,0-8.93-3.212a11.188,11.188,0,0,1-3.247-8.319,12.436,12.436,0,0,1,4-9.108q4.059-4,10.9-4a10.321,10.321,0,0,1,3.015.316,1.438,1.438,0,0,1,.232,1,9.738,9.738,0,0,1-.174,1.738,4.159,4.159,0,0,1,2.2.948,11.483,11.483,0,0,1,2.262,1.843,8.059,8.059,0,0,1,1.508,2.685A10.652,10.652,0,0,1,250.533,441.279Zm-8.466-3.686a5.1,5.1,0,0,0-2.609-.79h-.464a2.191,2.191,0,0,1-.116-.895,4.931,4.931,0,0,1,.175-1.317,6.466,6.466,0,0,0-4.465,1.948,7.165,7.165,0,0,0-2.029,5.424q0,4.106,2.9,5.686a6.076,6.076,0,0,0,3.015.631,5.164,5.164,0,0,0,3.653-1.632,6.331,6.331,0,0,0,1.739-4.844Q243.864,438.595,242.067,437.594Z"
        transform="translate(6 -334.85)"
      />
      <g transform="translate(-80 -19)">
        <path
          class="b"
          style="fill-rule: evenodd"
          d="M102.971,237.638C108.175,215,124.431,188,143.679,188s35.5,27,40.708,49.638a57.187,57.187,0,0,1-81.417,0Z"
          transform="translate(25.509 -101.285)"
        />
        <path
          class="c"
          style="fill-rule: evenodd;fill: #fff"
          d="M124.146,280.489c5.028-21.434,18.926-47.863,33.565-28.99,10.859-20.789,30.958,7.614,34.664,27.745a57.206,57.206,0,0,1-68.23,1.245Z"
          transform="translate(11.763 -137.788)"
        />
        <path
          class="a"
          style="fill: #f66"
          d="M214.947,330H206l4.912,15.437Z"
          transform="translate(-41.373 -193.465)"
        />
        <ellipse
          cx="6.5"
          cy="12.5"
          rx="6.5"
          ry="12.5"
          transform="translate(146 118)"
        />
        <ellipse
          cx="6.5"
          cy="12.5"
          rx="6.5"
          ry="12.5"
          transform="translate(179 118)"
        />
        <ellipse
          class="d"
          style="fill: #fff"
          cx="3"
          cy="6"
          rx="3"
          ry="6"
          transform="translate(150 127)"
        />
        <ellipse
          class="d"
          style="fill: #fff"
          cx="3"
          cy="6"
          rx="3"
          ry="6"
          transform="translate(183 127)"
        />
        <ellipse
          class="d"
          style="fill: #fff"
          cx="1"
          cy="2"
          rx="1"
          ry="2"
          transform="translate(156 120)"
        />
        <ellipse
          class="d"
          style="fill: #fff"
          cx="1"
          cy="2"
          rx="1"
          ry="2"
          transform="translate(189 120)"
        />
        <path
          class="e"
          style="stroke: #000"
          d="M190.89,158.207c2.111,2.631,8.771,11.286,12.981,14.209-1.286,1.345-6.315,2.842-16.139-1.93s-8.075-14.736-5.087-11.578,6.491,8.128,10.7,9.3C189.837,165.82,188.779,155.575,190.89,158.207Z"
          transform="translate(-24.689 -81.666)"
        />
      </g>
    </g>
  </svg>
  <!-- Search Icon -->
  <svg
    v-else-if="name === 'search'"
    xmlns="http://www.w3.org/2000/svg"
    class="w-5 h-5 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
  <!-- Close -->
  <svg
    v-else-if="name === 'close'"
    xmlns="http://www.w3.org/2000/svg"
    class="h-3 w-3 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
  <!-- Info icon -->
  <svg
    v-else-if="name === 'info'"
    class="cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
    />
    <path
      d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
    />
  </svg>
</template>
<script>
export default {
  name: "navbar-svg",
  props: ["name", "open"],
  emits: ["show"],
};
</script>
<style scoped>
.line {
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}
.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
</style>
