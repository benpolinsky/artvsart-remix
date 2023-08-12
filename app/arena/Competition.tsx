import {
  createCompetition,
  pickRandomArt,
} from "~/storage/dbOperations.server";

// create a competition which attaches two arts.
export interface ArtCombatant {
  id: string;
  title: string;
  creator: string;
  description: string;
}

export const prepCompetition = async (cache = false) => {
  const arts = await pickRandomArt(2);
  const competition = await createCompetition(arts);

  return {
    arts,
    competitionId: competition.id,
  };
};
