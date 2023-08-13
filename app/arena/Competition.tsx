import {
  createCompetition,
  findCompetition,
  pickRandomArt,
  updateCompetition,
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

export const setCompetitionWinner = async (
  competitionId: string,
  winnerId: string
) => {
  const competition = await findCompetition(competitionId);
  if (competition.winnerId)
    throw new Error("Competition already has a winner! Impossible!");

  const updatedCompetition = await updateCompetition(competitionId, winnerId);

  return updatedCompetition;
};
