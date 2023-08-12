import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/storage/db.server";

export const loader = async ({ params }: LoaderArgs) =>
  json({
    art: await db.art.findUnique({
      where: {
        id: params.artId,
      },
      select: {
        id: true,
        title: true,
        creator: true,
        creationDate: true,
        imageUrl: true,
        imageAltText: true,
        description: true,
      },
    }),
  });

export default function ArtRoute() {
  const data = useLoaderData<typeof loader>();
  if (!data.art) return <p>Error occurred</p>; // get to this with boundaries perhaps
  return (
    <article>
      <h1>{data.art.title}</h1>
      <h2>{data.art.creator}</h2>
      <p>{data.art.creationDate}</p>
      <div>{data.art.description}</div>
      <p>{data.art.id}</p>
    </article>
  );
}
