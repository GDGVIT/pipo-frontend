<template>
  <!-- Notifications Icon -->
  <svg
    v-if="name === 'notificationsIcon'"
    class="w-8 h-8"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 54.377 54.377"
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
  <!-- Challenges Icon -->
  <svg
    v-if="name === 'challengesIcon'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50.403 50.403"
    class="w-8 h-8"
  >
    <g transform="matrix(0.951, 0.309, -0.309, 0.951, 12.361, 0)">
      <rect style="fill: none" width="40" height="40" />
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
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style></style>
