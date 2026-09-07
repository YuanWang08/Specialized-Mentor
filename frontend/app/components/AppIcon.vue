<script setup lang="ts">
defineProps<{ name: string; size?: number }>()

const paths: Record<string, string> = {
  home: 'M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5M9.5 21v-6h5v6',
  briefcase:
    'M3 8.5h18v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-11ZM8.5 8.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v3.5M3 13.5h18',
  heart:
    'M12 20.5S3.5 15.2 3.5 9.6A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 8.5 2.4c0 5.6-8.5 10.9-8.5 10.9Z',
  users:
    'M15.5 20v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.2V20M9.2 11.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM21 20v-1.8a3.6 3.6 0 0 0-2.7-3.5M15.6 4.2a3.6 3.6 0 0 1 0 7',
  run: 'M13.5 5.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM9 21.5l2.4-5.2-2.6-2.3.9-5.2 3.8-1.5 3 2.6 3 .9M11.7 9.3 7.5 11l-1.9 3.4M13.7 16.3l2.6 5.2',
  arrow: 'M9 6l6 6-6 6',
  quote: 'M8 11H5.5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2H8a2 2 0 0 1 2 2v6.5a5 5 0 0 1-4 4.9M18.5 11H16a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2v6.5a5 5 0 0 1-4 4.9',
  calendar: 'M4 6.5h16v14H4v-14ZM4 11h16M8.5 3.5v4M15.5 3.5v4',
  external: 'M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  book: 'M4 4.5h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4v-13ZM20 4.5h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20v-13Z',
  check: 'M4.5 12.5 9.5 17.5 19.5 6.5',
  camera: 'M3 8h3.5l1.5-2.5h8L17.5 8H21v11.5H3V8ZM12 17a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z',
  trophy: 'M7 4h10v5a5 5 0 0 1-10 0V4ZM7 5.5H4.2v1.8A3.3 3.3 0 0 0 7.5 10.6M17 5.5h2.8v1.8a3.3 3.3 0 0 1-3.3 3.3M12 14v3.5M8.5 20.5h7',
  menu: 'M4 7h16M4 12h16M4 17h16',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 9h17M3.5 15h17M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18',
  close: 'M6 6l12 12M18 6 6 18',
}
</script>

<template>
  <svg
    :width="size || 22"
    :height="size || 22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="paths[name] || ''" />
  </svg>
</template>
