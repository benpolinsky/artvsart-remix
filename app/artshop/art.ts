import type { BingImageResponse } from "~/services/AzureImageSearch";
import { AzureImageSearch } from "~/services/AzureImageSearch";
import type { ArtDatabaseProperties } from "~/storage/db.types";
import { saveArt } from "~/storage/dbOperations.server";

interface ArtSearch {
  title: string;
  creator: string;
  // medium
}

async function findImageForArt(
  art: ArtSearch
): Promise<BingImageResponse | undefined> {
  console.log("Finding image - start");

  const searchClient = new AzureImageSearch();
  const proposedImages = (
    await searchClient.query(`${art.title} by ${art.creator}`)
  )?.value;

  console.log("Finding image - done");
  return proposedImages?.[0];
}

export async function createArt(
  art: ArtDatabaseProperties,
  autoImage: boolean = false
) {
  console.log(`creating art - ${art.title} - start`);

  let image;
  if (autoImage) {
    image = await findImageForArt(art);
  }

  if (image)
    art = {
      ...art,
      imageUrl: image.contentUrl,
      imageThumbnailUrl: image.thumbnailUrl,
      imageAltText: image.name,
    };

  const saveArtPromise = saveArt(art);

  console.log(`creating art - ${art.title} - done`);
  return saveArtPromise;
}
