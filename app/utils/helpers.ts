import type { LinksFunction } from "@remix-run/node";

export function addStyleSheets(_hrefs: string | string[]): LinksFunction {
  const hrefs = [...[_hrefs]].flat();

  return () =>
    hrefs.map((href) => ({
      rel: "stylesheet",
      href,
    }));
}

export async function wait(timeMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeMs);
  });
}
