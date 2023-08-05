#!/usr/bin/env node
import chalk from "chalk";
import ora from "ora";
import * as utils from "./utils/index.mjs";
import { googleGetWebsiteRank } from "./google.mjs";
async function run() {
    const parser = new utils.ArgumentsParser();
    const args = await parser.parse();
    const rankByKeywords = [];
    for (const keyword of args.keywords) {
        const prom = googleGetWebsiteRank(args.website, keyword, {
            maxPage: args.maxPage,
        });
        rankByKeywords.push([keyword, prom]);
    }
    process.stdout.write(`Ranks for ${chalk.blueBright(args.website)} website:\n`);
    const loading = ora("Getting ranks...");
    loading.start();
    for (const [keyword, prom] of rankByKeywords) {
        loading.text = `Getting ranks of ${chalk.blueBright(keyword)} keyword...`;
        const str = utils.formatKeywordRank(keyword, await prom);
        process.stdout.write(`\r\x1b[K${str}\n`);
    }
    loading.stop();
}
run();
//# sourceMappingURL=bin.mjs.map