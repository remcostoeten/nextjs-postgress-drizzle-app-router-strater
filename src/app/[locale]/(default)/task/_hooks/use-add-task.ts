import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import { trpc } from "@/trpc";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return trpc.tasks.add.useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(getQueryKey(trpc.tasks.list));
    },
  });
};
