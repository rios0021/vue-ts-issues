<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { toRef } from 'vue';
import { Label } from '../../interfaces/label';

const { labelsQuery, toggleLabel, selectedLabels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner
      v-if="labelsQuery.isLoading.value"
      size="50px"
      :thickness="4"
      :show-text="false"
    />
    <q-chip
      v-for="label of labelsQuery.data.value"
      :key="label.id"
      :style="
        !selectedLabels.includes(label.name)
          ? `color: #${label.color};`
          : `background-color: #${label.color}!important;`
      "
      outline
      clickable
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>
