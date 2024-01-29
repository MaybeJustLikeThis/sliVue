//对ios和windows进行适配
export const configPath = `${
  process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]
}/.slivue`;

export const defaultConfig = {
  uername: "maybe",
  github: "https://github.com/MaybeJustLikeThis/sliVue.git",
};
