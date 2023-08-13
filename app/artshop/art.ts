import { AzureImageSearch } from "~/services/AzureImageSearch";
import { saveArt } from "~/storage/dbOperations.server";

export interface BingImageResponse {
  imageId: string;
  contentUrl: string;
  thumbnailUrl: string;
  name: string;
}

interface ArtSearch {
  title: string;
  creator: string;
  // medium
}

async function findImageForArt(
  art: ArtSearch
): Promise<BingImageResponse | null> {
  console.log("Finding image - start");

  const searchClient = new AzureImageSearch();
  const proposedImages = (
    await searchClient.query(`${art.title} by ${art.creator}`)
  )?.value;

  console.log("Finding image - done");
  return proposedImages?.[0];
}

export async function createArt(art: any, autoImage: boolean = false) {
  console.log(`creating art - ${art.title} - start`);

  let image;
  if (autoImage) image = await findImageForArt(art);

  const saveArtPromise = saveArt({
    ...art,
    imageUrl: image?.contentUrl,
    imageThumbnailUrl: image?.thumbnailUrl,
    imageAltText: image?.name,
  });

  console.log(`creating art - ${art.title} - done`);
  return saveArtPromise;
}
