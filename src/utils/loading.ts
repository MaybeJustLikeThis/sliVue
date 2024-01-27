import ora from "ora";
export const warpLoading = async (message, fn) => {
  const spinner = ora(message);
  spinner.start();
  const res = await fn(); //app  将用户的逻辑包裹loading
  spinner.succeed();
  return res;
};
