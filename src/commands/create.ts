import { existsSync, rmSync } from "fs";
import path from "path";
import inquirer from "inquirer";
import { warpLoading } from "../utils/loading.js";

export default async function (name, option) {
  const cwd = process.cwd(); //获取当前项目的工作目录
  const targetDir = path.join(cwd, name);

  if (existsSync(targetDir)) {
    if (option.force) {
      rmSync(targetDir, { recursive: true }); //递归删除目录内容
    } else {
      // 询问用户是否覆盖
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "目录是否要覆盖",
          choices: [
            { name: "overwrite", value: "overwrite" },
            { name: "cancel", value: false },
          ],
        },
      ]);
      if (!action) {
        return console.log("用户取消覆盖！");
      }
      if (action === "overwrite") {
        await warpLoading("remove", () => {
          rmSync(targetDir, { recursive: true }); //递归删除目录内容
        });
      }
    }
  }
}
