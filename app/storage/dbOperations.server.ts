import { AWAY_TEAM_INDEX, HOME_TEAM_INDEX } from "~/utils/constants";
import { db } from "./db.server";
import type { ArtCombatant } from "~/arena/Competition";

type ArtScalarFields = "title" | "creator" | "description"; // etc

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

export const findArt = async (
  artId: string,
  selectFields: ArtScalarFields[] = []
) => {
  const selectObj: { [K in ArtScalarFields]?: boolean } = {};

  selectFields.forEach((field) => {
    selectObj[field] = true;
  });

  const art = await db.art.findFirst({
    where: { id: artId },
    select: { id: true, ...selectObj },
  });

  if (!art) throw new Error(); // again figure out how best to deal with this
  return art;
};

// work on the data types, ditch the scalar union, instead can grab Art object keys
export const updateArt = async (id: string, data: any) => {
  await db.art.update({
    where: {
      id,
    },
    data,
  });
};
