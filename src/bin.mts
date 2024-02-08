#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";

import { ArgumentsParser, formatKeywordRank } from "./internal/index.mjs";
import { getWebsiteRank, WebsiteRank } from "./rank.mjs";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

type RankPromise = Promise<WebsiteRank | undefined>;

async function run() {
  const parser = new ArgumentsParser();
  const args = await parser.parse();
  let keywords: string[] | null = null
  if (args.keywordsFile && existsSync(args.keywordsFile)) {
    const file = await readFile(args.keywordsFile)
    keywords = file.toString().split('\n')
  }

  const rankByKeywords: [string, RankPromise][] = [];
  for (const keyword of keywords || args.keywords) {
    const prom = getWebsiteRank(args.website, keyword, {
      maxPage: args.maxPage,
    });
    rankByKeywords.push([keyword, prom]);
  }

  // process.stdout.write(
  //   `Ranks for ${chalk.blueBright(args.website)} website:\n`,
  // );

  // const loading = ora();
  // loading.start();
  for (const [keyword, prom] of rankByKeywords) {
    // loading.text = `Getting ranks of ${chalk.blueBright(keyword)} keyword...`;
    const str = formatKeywordRank(keyword, await prom);
    process.stdout.write(`${str}\n`);
  }
  // loading.stop();
}

run();
