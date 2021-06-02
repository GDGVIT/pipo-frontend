<template>
  <div>
    <!-- intro -->
    <div>
      <div>Calendar</div>
      <div>
        This is the calendar view for the the badge
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      window.alert(route.params.challengeName);
    });
  },
};
</script>

<style></style>
