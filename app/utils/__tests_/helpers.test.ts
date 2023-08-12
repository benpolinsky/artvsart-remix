import { describe, expect, it } from "vitest";
import { addStyleSheets } from "../helpers";

describe("helpers", () => {
  it("addStyleSheets returns a LinkFunction which returns a single link object", () => {
    expect(addStyleSheets("href-1")()).toEqual([
      {
        rel: "stylesheet",
        href: "href-1",
      },
    ]);
  });

  it("addStyleSheets returns a LinkFunction which returns  multiple link object", () => {
    expect(addStyleSheets(["href-1", "href-2"])()).toEqual([
      {
        rel: "stylesheet",
        href: "href-1",
      },
      {
        rel: "stylesheet",
        href: "href-2",
      },
    ]);
  });
});
