import { findId, findImage, getHomeWorld, toArray } from "../finder";
import { GetData } from "../request";

// Search for a character
const searchCharacter = async (parent: any, args: { search: string }) => {
  try {
    if (!args.search) {
      return [];
    }

    const input = args.search;

    const response = await GetData(`/people?search=${input}`);

    const { data } = response;

    const results = data.results.map(async (character: any) => {
      const id = findId(character.url);

      return {
        id: parseInt(id),
        name: character.name,
        height: character.height,
        mass: character.mass,
        characterImage: await findImage(
          `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
        ),
        birthYear: character.birth_year,
        gender: character.gender,
        hairColor: toArray(character.hair_color),
        eyeColor: toArray(character.eye_color),
        skinColor: toArray(character.skin_color),

        homeWorld: await getHomeWorld(character.homeworld),
      };
    });

    return results;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export default searchCharacter;
