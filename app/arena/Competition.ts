import {
  createCompetition,
  findCompetition,
  pickRandomArt,
  updateCompetition,
} from "~/storage/dbOperations.server";

export interface ArtCombatant {
  id: string;
  title: string;
  creator: string;
  description: string;
}

export class Competition {
  #numberOfCombatants = 2;
  #id: string | null = null;
  #artIds: [string, string] | [] = [];

  async prepare() {
    const arts = await pickRandomArt(this.#numberOfCombatants);
    const competition = await createCompetition(arts);

    this.#id = competition.id;
    this.#artIds = [competition.homeArtId, competition.awayArtId];

    return {
      arts,
      competitionId: this.#id,
    };
  }

  async setWinner(winnerId: string) {
    if (!this.#id)
      throw new Error(
        "Competition has not been prepared. Call `await competition.prepare()` first"
      );

    if (!this.#artIds.length || !this.#artIds.includes(winnerId))
      throw new Error("Winner is not a part of this competition. Impossible!");

    const competition = await findCompetition(this.#id);
    if (competition.winnerId)
      throw new Error("Competition already has a winner. Impossible!");

    return updateCompetition(this.#id, winnerId);
  }
}
