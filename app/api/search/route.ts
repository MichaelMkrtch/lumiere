import { searchMovies } from "@/services/searchMovies";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const signal = request.signal;

  if (query) {
    const data = await searchMovies({ signal, query });

    return Response.json(data);
  } else {
    redirect("/");
  }
}
