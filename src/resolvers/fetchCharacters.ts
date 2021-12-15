import { findId, findImage } from "../finder";
import { GetData } from "../request";

const getHomeWorld = async (url: string) => {
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

const extractPage = (input: string) => {
  const split = input.split("=");
  const lastIndex = split[split.length - 1];

  return parseInt(lastIndex);
};

const calculatePagination = (
  pageSize: any,
  forPagination: {
    count: number;
    next: string | null;
    previous: string | null;
  }
) => {
  const count = Math.floor(forPagination.count / pageSize);
  const remainder = forPagination.count % pageSize > 0 ? 1 : 0;

  const totalPages = count + remainder;

  const prev = forPagination.previous ? extractPage(forPagination.previous) : 0;
  const next = forPagination.next ? extractPage(forPagination.next) : 0;

  return {
    next,
    prev,
    totalPages,
  };
};

const fetchCharacters = async (parent: any, args: { page: string }) => {
  try {
    let page = 1;

    if (args.page) {
      page = parseInt(args.page);
    }

    const response = await GetData(`/people?page=${page}`);

    const { data } = response;

    const results = data.results.map(async (character: any) => {
      return {
        name: character.name,
        height: character.height,
        mass: character.mass,
        characterImage: await findImage(
          `https://starwars-visualguide.com/assets/img/characters/${findId(
            character.url
          )}.jpg`
        ),
        birthYear: character.birth_year,
        gender: character.male,
        hairColor: character.hair_color,
        eyeColor: character.eye_color,
        skinColor: character.skin_color,

        homeWorld: await getHomeWorld(character.homeworld),
      };
    });

    const forPagination = {
      count: data.count,
      next: data.next,
      previous: data.previous,
    };

    return {
      list: results,
      pagination: calculatePagination(10, forPagination),
    };
  } catch (error) {
    console.error(error);

    return {
      list: [],
      pagination: {
        next: 0,
        prev: 0,
        totalPages: 1,
      },
    };
  }
};

export default fetchCharacters;
