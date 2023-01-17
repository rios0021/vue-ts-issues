import { useQuery } from '@tanstack/vue-query';
import { useIssuesStore } from 'src/stores/issues';
import { computed } from 'vue';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi<Label[]>('/labels?per_page=100', {
    headers: {
      Authorization: null,
    },
  });
  return data;
};

const useLabels = () => {
  const issuesStore = useIssuesStore();

  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    labelsQuery,

    // Getters
    selectedLabels: computed(() => issuesStore.labels),
    selectedState: computed(() => issuesStore.state),

    // Methods
    toggleLabel: issuesStore.toggleLabel,
  };
};

export default useLabels;
