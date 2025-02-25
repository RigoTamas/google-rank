import { SearchResultNode, searchWithPages } from "google-sr";

/**
 * Represents the ranking of a website in Google Search.
 */
export interface WebsiteRank {
  /** The search page ranking of the website. */
  page: number;

  /** The ranking of the website on the specified page. */
  rank: number;
  overallRank: number;
}

/**
 * Retrieves the rank of a website in Google search results for a specific keyword.
 * @param website - The website URL to check the rank for.
 * @param keyword - The keyword to search for.
 * @param opts - Additional options.
 * @returns A promise that resolves to the rank of the website. Returns `undefined` if the website is not found in the search results.
 */
export async function getWebsiteRank(
  website: string,
  keyword: string,
  opts?: { maxPage?: number },
): Promise<WebsiteRank | undefined> {
  const maxPage = opts?.maxPage ?? 1;

  const res = await searchWithPages({ query: keyword, pages: maxPage });

  let overallRank = 0;
  for (let page = 0; page < res.length; ++page) {
    const websites: string[] = [];
    let prevWebsite = "";
    for (let result of res[page]) {
      result = result as SearchResultNode;
      if (result.link == null) continue;
      const website = new URL(result.link).hostname;
      if (website !== prevWebsite) websites.push(website);
      prevWebsite = website;
    }

    for (let rank = 0; rank < websites.length; ++rank) {
      overallRank++;
      if (websites[rank].includes(website)) {
        return { page, rank, overallRank };
      }
    }
  }
  return undefined;
}
