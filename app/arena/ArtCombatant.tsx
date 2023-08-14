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
      <img src={art.imageUrl} alt={art.imageAltText} />
    </div>
  );
}
