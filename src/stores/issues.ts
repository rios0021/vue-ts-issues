import { defineStore } from 'pinia';
import { State } from 'src/issues/interfaces/issue';
import { ref, computed } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
  // TODO: Fix data type
  const state = ref<State>(State.All);

  const labels = ref<string[]>([]);

  return {
    // Properties
    state,
    labels,

    // Getters

    // Actions
    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label !== labelName);
        return;
      }
      labels.value.push(labelName);
    },
  };
});
