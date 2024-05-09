import { Results } from "@/types";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

type FetchDataParams = {
  signal: AbortSignal;
  query: string;
};

export async function searchMovies({ signal, query }: FetchDataParams) {
  const params = new URLSearchParams({
    query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  });

  let url = `https://api.themoviedb.org/3/search/movie?${params}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    signal: signal,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let error = new Error("An error occured while fetching movie data!");
      throw error;
    }

    const data: Results = await response.json();

    return data.results.slice(0, 5);
  } catch (error) {
    console.log(error);
  }
}
