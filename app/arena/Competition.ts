import {
  createCompetition,
  findCompetition,
  pickRandomArt,
  updateCompetition,
} from "~/storage/dbOperations.server";

// Move back to functions, the class doesn't really help.

export class Competition {
  #numberOfCombatants = 2;
  #id: string | null = null;
  #artIds: [string, string] | [] = [];

  // readies a competition by choosing two random art
  // and attaching them to a new competition
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

  // loads a previously prepared competition
  async load(competitionId: string) {
    const competition = await findCompetition(competitionId);

    this.#id = competitionId;
    this.#artIds = [competition.homeArtId, competition.awayArtId];
  }

  async setWinner(winnerId: string) {
    if (!this.#id)
      throw new Error(
        "Competition has not been prepared. Call `competition.prepare or competition.load` first"
      );

    if (!this.#artIds.length || !this.#artIds.includes(winnerId))
      throw new Error("Winner is not a part of this competition. Impossible!");

    const competition = await findCompetition(this.#id);
    if (competition.winnerId)
      throw new Error("Competition already has a winner. Impossible!");

    return updateCompetition(this.#id, winnerId);
  }
}
