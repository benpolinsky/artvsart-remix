import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
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
        imageThumbnailUrl: true,
      },
    }),
  });

export default function ShowArt() {
  const data = useLoaderData<typeof loader>();
  if (!data.art) return <p>Error occurred</p>; // get to this with boundaries perhaps
  return (
    <div>
      <article>
        <h1>{data.art.title}</h1>
        <h2>{data.art.creator}</h2>
        <p>{new Date(data.art.creationDate).toDateString()}</p>
        <div>{data.art.description}</div>
        <p>{data.art.id}</p>
        <img src={data.art.imageThumbnailUrl} alt={data.art.imageAltText} />
      </article>
      <div>
        <Link to={`/dashboard/arts/${data.art.id}/addImage`}>
          {data.art.imageUrl ? "Change Image" : "Add Image"}
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
