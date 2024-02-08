import chalk from "chalk";
import { WebsiteRank } from "../rank.mjs";

function formatPageRank(rank?: WebsiteRank): string {
  if (rank === undefined) return `${chalk.blackBright("-1")}`;
  return rank.page <= 0
    ? `${chalk.greenBright(rank.page + 1)}`
    : `${chalk.redBright(rank.page + 1)}`;
}

function formatRank(rank?: WebsiteRank): string {
  if (rank === undefined) return `${chalk.blackBright("-1")}`;
  return rank.page <= 0 && rank.rank <= 2
    ? `${chalk.greenBright(rank.rank + 1)}`
    : `${chalk.redBright(rank.rank + 1)}`;
}

/**
 * Formats the rank of a keyword as a string.
 * @param keyword - The keyword string.
 * @param rank - The rank of the keyword.
 * @returns A formatted string. The rank will be displayed as a question mark if it is undefined.
 */
export function formatKeywordRank(keyword: string, rank?: WebsiteRank): string {
  return `${keyword};${new Date().toISOString()};${formatPageRank(rank)};${formatRank(rank)};${rank?.overallRank || -1}`;
}
