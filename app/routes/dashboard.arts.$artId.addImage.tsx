import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { BingImageResponse } from "~/services/AzureImageSearch";
import { AzureImageSearch } from "~/services/AzureImageSearch";
import { findArt, updateArt } from "~/storage/dbOperations.server";
import { addStyleSheets } from "~/utils/helpers";
import addArtImageStyles from "~/styles/addArtImage.css";
import { mockImageRepsonse } from "~/services/mockImageResponse";
import type { ArtDatabaseProperties } from "~/storage/db.types";
import { assertArtDatabaseProperties } from "~/storage/db.types";

const useMockResponses = false; // so I don't blow up my bing api search credits

export const links = addStyleSheets(addArtImageStyles);

export const action = async ({ request, params }: ActionArgs) => {
  if (!params.artId) return new Error("No artId provided"); // lookup rec. way of handling this

  const formData = await request.formData();
  const imageUrl = formData.get("imageUrl")?.toString();
  const imageAltText = formData.get("imageUrl")?.toString();
  const imageThumbnailUrl = formData.get("imageThumbnailUrl")?.toString();

  if (imageUrl && imageAltText && imageThumbnailUrl) {
    await updateArt(params.artId, {
      imageUrl,
      imageAltText,
      imageThumbnailUrl,
    });

    return redirect(`/dashboard/arts/${params.artId}`);
  }
};

export const loader = async ({ params: { artId } }: LoaderArgs) => {
  if (!artId) return new Error("No artId provided"); // lookup rec. way of handling this

  const art = await findArt(artId, ["title"]);
  let proposedImages;

  if (useMockResponses) {
    proposedImages = mockImageRepsonse;
  } else {
    const searchClient = new AzureImageSearch();
    proposedImages = (await searchClient.query(art.title))?.value;
  }

  return json({ art, proposedImages });
};

interface AddArtImageData {
  art: ArtDatabaseProperties;
  proposedImages: BingImageResponse[];
}

export default function AddArtImage() {
  const data = useLoaderData<AddArtImageData>();

  assertData(data);
  assertArtDatabaseProperties(data.art);
  const art = data.art;
  const proposedImages = data.proposedImages;

  const [activeThumbnail, setActiveThumbnail] =
    useState<BingImageResponse | null>(null);

  return (
    <div>
      <h1>Add art image for: {art.title}</h1>
      <form method="post">
        <input disabled={!activeThumbnail} value={"Add Image"} type="submit" />
        {activeThumbnail && (
          <>
            <input
              readOnly
              hidden
              name="imageUrl"
              value={activeThumbnail.contentUrl}
            />
            <input
              hidden
              readOnly
              name="imageAltText"
              value={getAltText(activeThumbnail, `${art.title} image`)}
            />
            <input
              hidden
              readOnly
              name="imageThumbnailUrl"
              value={activeThumbnail.thumbnailUrl}
            />
          </>
        )}
      </form>

      {/* look into transition/suspense whatever */}
      {/* and prefetch maybe? see how that works... */}
      {proposedImages?.length && (
        <div>
          <ul className="proposedImageThumbnailList">
            {proposedImages.map((image: BingImageResponse) => (
              <li
                key={image.imageId}
                className={`proposedImageThumbnail ${
                  image.imageId === activeThumbnail?.imageId ? "active" : ""
                }`}
              >
                <img
                  src={image.thumbnailUrl}
                  alt={getAltText(image, `${art.title} image`)}
                  onClick={() => setActiveThumbnail(image)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function getAltText(image: { name: string }, fallback: string) {
  return image.name ?? fallback;
}

function assertData(data: AddArtImageData): asserts data is AddArtImageData {
  if (!data) throw new Error("No data");
  if (!data.art) throw new Error("No art in data");
  if (!data.proposedImages?.length) throw new Error("No images found");
}
