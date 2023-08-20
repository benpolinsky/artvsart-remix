export interface ArtDatabaseProperties {
  id: string;
  creator: string;
  title: string;
  description: string;
  creationDate: string; // would be great to type this ISO-8601 but attempts so far have yielded ts(2590) - too complex
  imageUrl: string;
  imageAltText: string;
  imageThumbnailUrl: string;
}

export interface CompetitionDatabaseProperties {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  homeArt: ArtDatabaseProperties;
  awayArt: ArtDatabaseProperties;
  winner: ArtDatabaseProperties;
}
export function assertArtDatabaseProperties(
  art: ArtDatabaseProperties
): asserts art is ArtDatabaseProperties {
  if (
    !art.id ||
    !art.creator ||
    !art.title ||
    !art.description ||
    !art.creationDate ||
    !art.imageAltText ||
    !art.imageThumbnailUrl ||
    !art.imageUrl
  )
    throw new Error("Art not fully formed");
}
