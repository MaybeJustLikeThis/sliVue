#! /usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import { createRequire } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

//以当前的文件路径做到一个require

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const pkg = require(join(__dirname, "../package.json"));

program.version(`mycli@${pkg.version}`).usage("<command>[option]");

//1.通过脚手架来创建一个项目 create（拉取仓库中的模板）
//2.配置拉取得信息，配置系统文件 config
program
  .command("create <project-name>")
  .description("create a project")
  .option("-f, --force", "overwrite taget diretory")
  .action(async (name, option) => {
    (await import("./commands/create.js")).default(name, option);
  });

//slivue config --set a 1
program
  .command("config [value]")
  .description("inspect config")
  .option("-g, --get <path>", "get value")
  .option("-s, --set <path> <value>", "set value")
  .option("-d, --delete <path>", "delete value")
  .action(async (value, option) => {
    (await import("./commands/config.js")).default(value, option);
  });

program.addHelpText(
  "after",
  `\nRun ${chalk.blueBright(
    "slivue <command> --help"
  )} for detailed usage of given command`
);
// 需要解析用户传递的参数
program.parse(process.argv);
