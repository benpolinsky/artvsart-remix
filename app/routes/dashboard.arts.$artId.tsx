import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  assertArtDatabaseProperties,
  type ArtDatabaseProperties,
} from "~/storage/db.types";
import { findArtWithAllFields } from "~/storage/dbOperations.server";

export const loader = async ({ params }: LoaderArgs) =>
  json({
    art: await findArtWithAllFields(params.artId),
  });

export default function ShowArt() {
  const data = useLoaderData<{ data: { art: ArtDatabaseProperties } }>();
  assertData(data);

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

function assertData(data: any): asserts data is { art: ArtDatabaseProperties } {
  if (!data) throw new Error("No data");
  assertArtDatabaseProperties(data.art);
}
