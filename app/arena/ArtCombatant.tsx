export interface ArtCombatantProps {
  art: IArtCombatant;
}

export interface IArtCombatant {
  id: string;
  title: string;
  creator: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
}

export function ArtCombatant({ art }: ArtCombatantProps) {
  return (
    <div className="artCombatant">
      <h1>{art.title}</h1>
      <h2>{art.creator}</h2>
      <span className="artImageContainer">
        <img src={art.imageUrl} alt={art.imageAltText} />
        <div className="artDescription">{art.description}</div>
      </span>
    </div>
  );
}

export function assertArtCombatants(arts: IArtCombatant[]) {
  arts.forEach(assertArtCombatant);
}

export function assertArtCombatant(
  art: IArtCombatant
): asserts art is IArtCombatant {
  if (!art) throw new Error("Art is null");
  const isValid = artCombatantRequiredFields.every((f) => art?.[f]);
  if (!isValid) {
    throw new Error("Art is not fully formed");
  }
}

const artCombatantRequiredFields = [
  "id",
  "title",
  "creator",
  "imageUrl",
  "imageAltText",
] as const;
