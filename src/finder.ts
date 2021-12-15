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

export const getHomeWorld = async (url: string) => {
  try {
    const response = await GetData(url);

    const { data } = response;

    return {
      image: await findImage(
        `https://starwars-visualguide.com/assets/img/planets/${findId(url)}.jpg`
      ),
      name: data.name,
      population: data.population,
      size: data.diameter,
    };
  } catch (error) {
    console.log(error);

    return {
      image: "",
      name: "",
      population: "",
      size: "",
    };
  }
};

export const toArray = (word: string) => {
  const str = word.split(",").map((value) => {
    return value.trim();
  });

  return str;
};
