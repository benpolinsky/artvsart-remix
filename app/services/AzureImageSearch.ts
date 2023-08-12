export class AzureImageSearch {
  #searchKey: string;
  #baseUrl: string;

  constructor() {
    if (!process.env.AZURE_SEARCH_API_KEY)
      throw new Error("Please set an azure api key in your .env file");
    this.#searchKey = process.env.AZURE_SEARCH_API_KEY;
    this.#baseUrl = "https://api.bing.microsoft.com/v7.0/images/search";
  }

  async query(query: string): Promise<{ value: any[] } | undefined> {
    try {
      const result = await fetch(
        `${this.#baseUrl}/?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": this.#searchKey,
          },
        }
      );

      return result.json();
    } catch (error) {
      console.error("An error occurred while querying the bing service: ");
      console.error(error);
      return undefined;
    }
  }
}
