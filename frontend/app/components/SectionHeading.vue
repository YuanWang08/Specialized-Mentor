<script setup lang="ts">
defineProps<{ title: string; sub?: string; id?: string }>()
</script>

<template>
  <header class="sec-head" :id="id">
    <h2 class="sec-title">{{ title }}</h2>
    <p v-if="sub" class="sec-sub">{{ sub }}</p>
  </header>
</template>
