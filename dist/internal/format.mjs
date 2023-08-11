import chalk from "chalk";
function formatPageRank(rank) {
    if (rank === undefined)
        return `page ${chalk.blackBright("?")}`;
    return rank.page <= 0
        ? `page ${chalk.greenBright(rank.page + 1)}`
        : `page ${chalk.redBright(rank.page + 1)}`;
}
function formatRank(rank) {
    if (rank === undefined)
        return `rank ${chalk.blackBright("?")}`;
    return rank.page <= 0 && rank.rank <= 2
        ? `rank ${chalk.greenBright(rank.rank + 1)}`
        : `rank ${chalk.redBright(rank.rank + 1)}`;
}
/**
 * Formats the rank of a keyword as a string.
 * @param keyword - The keyword string.
 * @param rank - The rank of the keyword.
 * @returns A formatted string. The rank will be displayed as a question mark if it is undefined.
 */
export function formatKeywordRank(keyword, rank) {
    return `${formatPageRank(rank)}  ${formatRank(rank)}  ${keyword}`;
}
//# sourceMappingURL=format.mjs.map