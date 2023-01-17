import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const useStore = () => {
  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs(issuesStore);

  return {
    // Reactive properties
    labels,
    state,
    // Getters
    // Methods
  };
};

export default useStore;
