import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issue';

interface Args {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  body = '',
  labels = [],
}: Args): Promise<Issue> => {
  const newIssueData = { title, body, labels };
  const { data } = await githubApi.post<Issue>('/issues', newIssueData);
  console.log({ DataFromGithub: data });
  return data;
};

const useIssueMutation = () => {
  const queryClient = useQueryClient();
  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.setQueryData(['issue', issue.number], issue);
    },
    onSettled: () => {
      // Something
    },
  });
  return {
    issueMutation,
  };
};

export default useIssueMutation;
