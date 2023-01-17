import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { useIssuesStore } from 'src/stores/issues';
import { Issue, State } from '../interfaces/issue';
import { storeToRefs } from 'pinia';
import useStore from './useStore';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }
  params.append('per_page', '10');
  // params.append('state', `${selectedState}`);
  // console.log(selectedLabels);

  const { data } = await githubApi.get<Issue[]>('/issues', {
    params,
  });
  return data;
};

const useIssues = () => {
  // const issuesStore = useIssuesStore();
  // const { labels, state } = storeToRefs(issuesStore);
  const { labels, state } = useStore();
  const issuesQuery = useQuery(['issues', { labels, state }], () =>
    getIssues(labels.value, state.value)
  );
  return {
    issuesQuery,
  };
};

export default useIssues;
