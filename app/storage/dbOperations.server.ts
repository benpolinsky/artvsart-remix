import { AWAY_TEAM_INDEX, HOME_TEAM_INDEX } from "~/utils/constants";
import { db } from "./db.server";
import type { ArtCombatant } from "~/arena/Competition";

export const pickRandomArt = async (count: number) => {
  const arts = await db.$queryRaw<
    ArtCombatant[]
  >`SELECT id, title, creator, description FROM Art ORDER BY RANDOM() LIMIT ${count}`;
  return arts;
};

export const createCompetition = async (arts: ArtCombatant[]) => {
  return db.competition.create({
    data: {
      awayArtId: arts[AWAY_TEAM_INDEX].id,
      homeArtId: arts[HOME_TEAM_INDEX].id,
    },
  });
};
