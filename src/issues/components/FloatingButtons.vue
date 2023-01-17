<script setup lang="ts">
interface Button {
  icon: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  action: () => void;
}
interface Props {
  buttons: Button[];
}

const props = defineProps<Props>();
</script>

<template>
  <q-page-sticky position="bottom-right" :offset="[30, 30]">
    <q-btn
      v-for="(button, idx) in props.buttons"
      :key="idx"
      fab
      :icon="button.icon"
      :color="button.color || 'primary'"
      :size="button.size || 'md'"
      @click="button.action"
      class="q-mx-xs"
    />
  </q-page-sticky>
</template>

<style scoped></style>
