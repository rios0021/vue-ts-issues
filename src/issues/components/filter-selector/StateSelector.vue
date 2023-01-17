<script setup lang="ts">
import { useIssuesStore } from 'src/stores/issues';

const issuesStore = useIssuesStore();
</script>

<template>
  <q-btn-toggle
    v-model="issuesStore.state"
    push
    spread
    toggle-color="primary"
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>

<style scoped></style>
