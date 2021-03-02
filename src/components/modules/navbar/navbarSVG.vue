<template>
  <svg
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
  <svg
    v-else-if="name === 'notificationsIcon'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 54.377 54.377"
  >
    <g transform="matrix(0.875, -0.485, 0.485, 0.875, 0, 19.392)">
      <rect class="a" style="fill: none" width="40" height="40" />
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
  <svg
    v-else-if="name === 'challengesIcon'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50.403 50.403"
  >
    <g transform="matrix(0.951, 0.309, -0.309, 0.951, 12.361, 0)">
      <rect class="a" style="fill: none" width="40" height="40" />
      <g transform="translate(5 1.667)">
        <path
          d="M22.667,5.333V3.667A1.667,1.667,0,0,0,21,2H6V37a1.667,1.667,0,1,0,3.333,0V22h10v1.667A1.667,1.667,0,0,0,21,25.333H36v-20Zm10,10H29.333v3.333h3.333V22H29.333V18.667H26V22H22.667V18.667H19.333V15.333H16v3.333H12.667V15.333H9.333V12h3.333V8.667H9.333V5.333h3.333V8.667H16V5.333h3.333V8.667h3.333V12H26V8.667h3.333V12h3.333Z"
          transform="translate(-6 -2)"
        />
        <rect width="3" height="3" transform="translate(7 10.333)" />
        <rect width="3" height="4" transform="translate(10 6.333)" />
        <rect width="4" height="3" transform="translate(13 10.333)" />
        <rect width="3" height="3" transform="translate(17 13.333)" />
        <rect width="3" height="3" transform="translate(20 10.333)" />
      </g>
    </g>
  </svg>
  <svg
    v-else-if="name === 'hamburgerIcon'"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="m12 24c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-23c-6.065 0-11 4.935-11 11s4.935 11 11 11 11-4.935 11-11-4.935-11-11-11z"
      />
    </g>
    <g>
      <path
        d="m16.5 8h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"
      />
    </g>
    <g>
      <path
        d="m16.5 12.5h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"
      />
    </g>
    <g>
      <path
        d="m16.5 17h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: "navbar-svg",
  props: ["name"],
};
</script>
<style scoped></style>
