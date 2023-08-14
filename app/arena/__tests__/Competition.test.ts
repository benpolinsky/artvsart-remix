// I could go either way on using a test db vs mocking
// and they each have positives and negatives.
// On the one hand, it's a boundary, not part of the core application, and makes sense to mock the edge
// On the other hand, it could be considered an implementation detail, and does not make sense to mock

import { beforeEach, describe, it, vi } from "vitest";
import { Competition } from "../Competition";
import { db } from "~/storage/db.server";

vi.mock("~/storage/db.server");

describe("Competition", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("preparing a competition returns two arts and a competitionId", async ({
    expect,
  }) => {
    db.$queryRaw = vi.fn();
    db.competition.create = vi.fn();

    const expectedCreated = new Date();
    const expectedUpdated = new Date();
    const expectedCompetitionId = "comp-id-01";
    const expectedArts = [
      {
        creator: "Mock Creator",
        title: "Title 1",
        description: "Some art we all love.",
        id: "guid-11-guid",
      },
      {
        creator: "Mock Creator 2",
        title: "Title 2",
        description: "Some art we all dislike.",
        id: "guid-22-guid",
      },
    ];

    (db.$queryRaw as any).mockResolvedValueOnce(expectedArts);

    const competition = new Competition();

    (db.competition.create as any).mockResolvedValueOnce({
      homeArtId: expectedArts[0].id,
      awayArtId: expectedArts[1].id,
      createdAt: expectedCreated,
      updatedAt: expectedUpdated,
      id: expectedCompetitionId,
      winnerId: null,
    });

    await expect(competition.prepare()).resolves.toEqual({
      arts: expectedArts,
      competitionId: expectedCompetitionId,
    });
  });

  it("selectWinner updates the competition with the winning art", async ({
    expect,
  }) => {
    db.$queryRaw = vi.fn();
    db.competition.create = vi.fn();
    db.competition.findFirst = vi.fn();
    db.competition.update = vi.fn();

    const expectedCreated = new Date();
    const expectedUpdated = new Date();
    const expectedCompetitionId = "comp-id-02";
    const expectedArts = [
      {
        creator: "Mock Creator 3",
        title: "Title 3",
        description: "Some art we all love. 3",
        id: "guid-33-guid",
      },
      {
        creator: "Mock Creator 4",
        title: "Title 4",
        description: "Some art we all dislike. 4",
        id: "guid-44-guid",
      },
    ];

    (db.$queryRaw as any).mockResolvedValueOnce(expectedArts);

    const competition = new Competition();

    (db.competition.create as any).mockResolvedValueOnce({
      homeArtId: expectedArts[0].id,
      awayArtId: expectedArts[1].id,
      createdAt: expectedCreated,
      updatedAt: expectedUpdated,
      id: expectedCompetitionId,
      winnerId: null,
    });

    await competition.prepare();

    (db.competition.findFirst as any).mockResolvedValueOnce({
      homeArtId: expectedArts[0].id,
      awayArtId: expectedArts[1].id,
      createdAt: expectedCreated,
      updatedAt: expectedUpdated,
      id: expectedCompetitionId,
      winnerId: null,
    });

    (db.competition.update as any).mockResolvedValueOnce({
      homeArtId: expectedArts[0].id,
      awayArtId: expectedArts[1].id,
      createdAt: expectedCreated,
      updatedAt: expectedUpdated,
      id: expectedCompetitionId,
      winnerId: "guid-33-guid",
      winner: expectedArts[0],
      homeArt: expectedArts[0],
      awayArt: expectedArts[1],
    });

    await competition.setWinner("guid-33-guid");

    expect(db.competition.update).toHaveBeenCalledWith({
      where: {
        id: expectedCompetitionId,
      },
      data: { winnerId: "guid-33-guid" },
    });
  });
});
