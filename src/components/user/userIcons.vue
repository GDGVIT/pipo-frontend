<template>
  <div class="p-2 w-8 mr-10 cursor-pointer">
    <svg
      v-if="name === 'rightArrow' || name === 'leftArrow'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
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
    <svg
      v-else-if="name === 'bin'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style></style>
