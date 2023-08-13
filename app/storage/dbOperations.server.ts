import { AWAY_TEAM_INDEX, HOME_TEAM_INDEX } from "~/utils/constants";
import { db } from "./db.server";
import type { ArtCombatant } from "~/arena/Competition";

type ArtScalarFields = "title" | "creator" | "description"; // etc

export const pickRandomArt = async (count: number) => {
  // random support through prism for sqlite is not there yet
  const arts = await db.$queryRaw<
    ArtCombatant[]
  >`SELECT id, title, creator, description FROM Art ORDER BY RANDOM() LIMIT ${count}`;
  return arts;
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

export const saveArt = async (data: any) => {
  return await db.art.create({ data });
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

export const createCompetition = async (arts: ArtCombatant[]) => {
  return db.competition.create({
    data: {
      awayArtId: arts[AWAY_TEAM_INDEX].id,
      homeArtId: arts[HOME_TEAM_INDEX].id,
    },
  });
};

export const findCompetition = async (
  competitionId: string,
  withArts: boolean = true
) => {
  const findOptions = {
    where: { id: competitionId },
    include: { awayArt: false, homeArt: false, winner: false },
  };

  if (withArts) {
    findOptions.include.awayArt = true;
    findOptions.include.homeArt = true;
    findOptions.include.winner = true;
  }

  const competition = await db.competition.findFirst(findOptions);

  if (!competition) throw new Error(); // again figure out how best to deal with this
  return competition;
};

export const updateCompetition = async (
  competitionId: string,
  winnerId: string
) => {
  return db.competition.update({
    where: {
      id: competitionId,
    },
    data: { winnerId },
    include: { homeArt: true, awayArt: true, winner: true },
  });
};
