import { GetData } from "./request";

// Find Id from URl
export const findId = (url: string) => {
  const split = url.split("/");
  const lastIndex = split[split.length - 2];

  return lastIndex;
};

export const findImage = async (url: string) => {
  const defaultImg =
    "https://img.wallpapersafari.com/desktop/728/410/65/30/t6wYIy.jpg";

  try {
    const check = await GetData(url);

    if (check.status === 200) {
      return url;
    }

    return defaultImg;
  } catch (error) {
    return defaultImg;
  }
};
