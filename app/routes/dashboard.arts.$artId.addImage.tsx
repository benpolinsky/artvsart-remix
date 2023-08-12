import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { AzureImageSearch } from "~/services/AzureImageSearch";
import { findArt, updateArt } from "~/storage/dbOperations.server";
import { addStyleSheets } from "~/utils/helpers";
import addArtImageStyles from "~/styles/addArtImage.css";
import { mockImageRepsonse } from "~/services/mockImageResponse";

const useMockResponses = true; // so I don't blow up my bing api search credits

export const links = addStyleSheets(addArtImageStyles);

// Here's an example of using the same action for two different purposes,
// distinguished by a form field. I think I'd like more separation
// (this was mentioned somewhere in the remix docs... )
export const action = async ({ request, params }: ActionArgs) => {
  if (!params.artId) return new Error("No artId provided"); // lookup rec. way of handling this

  const formData = await request.formData();
  const imageUrl = formData.get("imageUrl")?.toString();
  const imageAltText = formData.get("imageUrl")?.toString();
  const imageThumbnailUrl = formData.get("imageThumbnailUrl")?.toString();

  // if an image is selected, update the art record in db
  if (imageUrl && imageAltText && imageThumbnailUrl) {
    await updateArt(params.artId, {
      imageUrl,
      imageAltText,
      imageThumbnailUrl,
    });

    return redirect(`/dashboard/arts/${params.artId}`);
  }

  // if image is not selected, search bing for some recs.
  if (useMockResponses) return mockImageRepsonse;

  const art = await findArt(params.artId, ["title"]);
  const searchClient = new AzureImageSearch();
  const proposedImages = await searchClient.query(art.title);

  if (!proposedImages?.value) throw new Error("No search responses");

  return proposedImages.value;
};

export const loader = async ({ params: { artId } }: LoaderArgs) => {
  if (!artId) return new Error("No artId provided"); // lookup rec. way of handling this

  const art = await findArt(artId, ["title"]);

  return json({ art });
};

export default function AddArtImage() {
  const data = useLoaderData();
  const proposedImages = useActionData<any[]>();

  const [activeThumbnail, setActiveThumbnail] = useState<any>(null);

  return (
    <div>
      <h1>Add art image for: {data.art.title}</h1>
      <form method="post">
        <input
          value={activeThumbnail ? "Add Image" : "Find Suggestions"}
          type="submit"
        />
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
              value={getAltText(activeThumbnail, `${data.art.title} image`)}
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
            {proposedImages.map((image) => (
              <li
                key={image.imageId}
                className={`proposedImageThumbnail ${
                  image.imageId === activeThumbnail?.imageId ? "active" : ""
                }`}
              >
                <img
                  src={image.thumbnailUrl}
                  alt={getAltText(image, `${data.art.title} image`)}
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
