import { wait } from "~/utils/helpers";

export class AzureImageSearch {
  #searchKey: string;
  #baseUrl: string;
  #throttleMS: number;
  #firstQuery = true;

  constructor(throttleMS: number = 1000) {
    if (!process.env.AZURE_SEARCH_API_KEY)
      throw new Error("Please set an azure api key in your .env file");

    this.#searchKey = process.env.AZURE_SEARCH_API_KEY;
    this.#baseUrl = "https://api.bing.microsoft.com/v7.0/images/search";
    this.#throttleMS = throttleMS;
  }

  async query(query: string): Promise<{ value: any[] } | undefined> {
    try {
      if (!this.#firstQuery) await wait(this.#throttleMS); // no real reason to wait

      const result = await fetch(
        `${this.#baseUrl}/?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": this.#searchKey,
          },
        }
      );
      if (this.#firstQuery) this.#firstQuery = false;
      return result.json();
    } catch (error) {
      console.error("An error occurred while querying the bing service: ");
      console.error(error);
      return undefined;
    }
  }
}
