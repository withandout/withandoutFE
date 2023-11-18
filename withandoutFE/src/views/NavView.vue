<template>
  <nav>
    <span class="wrapIcons">
      <font-awesome-icon class="icons" icon="fa-bell" />
    </span>
    <span class="wrapIcons">
      <font-awesome-icon class="icons" icon="fa-solid fa-location-crosshairs" />
    </span>
    <span class="wrapIcons">
      <font-awesome-icon
        class="icons"
        icon="fa-solid fa-arrow-right-from-bracket"
      />
    </span>
    <span
      class="wrapIcons"
      @click.prevent="() => router.push({ name: 'home' })"
    >
      <font-awesome-icon class="icons" icon="fa-solid fa-house" />
    </span>
  </nav>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<style scoped>
@import '@/assets/css/nav.css';
</style>
