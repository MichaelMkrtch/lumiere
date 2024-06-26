import { useQueries } from "@tanstack/react-query";

import { type Film } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

export default function useFetchDetails(results: { id: number }[]) {
  const idList: number[] = [];
  const detailsResults: Film[] = [];

  results.forEach((result) => idList.push(result.id));

  const detailsQuery = useQueries({
    queries: idList.map((id) => ({
      queryKey: ["details", id],
      queryFn: () => fetchRoute(`/api/details?id=${id}`),
      staleTime: 1000 * 60 * 2,
      enabled: idList.length > 0,
    })),
  });

  if (detailsQuery) {
    detailsQuery.forEach((detailResult) => {
      detailResult.data && detailsResults.push(detailResult.data);
    });
  }

  return detailsResults;
}
