<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { ref } from 'vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import FloatingButtons from '../components/FloatingButtons.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import useIssues from '../composables/useIssues';
import useLabels from '../composables/useLabels';

const isOpen = ref<boolean>(false);
const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const openDialog = () => {
  isOpen.value = true;
};
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h2">Github Issues</span>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-4">
      <FilterSelector />
    </div>
    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="issuesQuery.isLoading.value" color="green" />
      <IssueList v-else :issues="issuesQuery.data?.value || []" />
    </div>
  </div>
  <FloatingButtons
    :buttons="[
      {
        icon: 'add',
        color: 'accent',
        size: 'lg',
        action: openDialog,
      },
    ]"
  />
  <NewIssueDialog
    v-if="labelsQuery.data"
    :is-open="isOpen"
    :labels="labelsQuery.data.value?.map((label) => label.name) || []"
    @on-close="isOpen = false"
  />
</template>

<style scoped></style>
