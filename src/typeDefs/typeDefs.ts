import { gql } from "apollo-server";

const typeDefs = gql`
  type HomeWorld {
    image: String
    name: String
    population: String
    size: String
  }

  type Character {
    name: String!
    characterImage: String
    birthYear: String
    height: String!
    mass: String!
    gender: String!
    hairColor: [String]
    eyeColor: [String]
    skinColor: [String]

    homeWorld: HomeWorld!
  }

  type Pagination {
    prev: Int
    next: Int
    totalPages: Int
  }

  type CharacterList {
    list: [Character]!
    pagination: Pagination!
  }

  type Query {
    characters(page: Int): CharacterList
    characterSearch(search: String!): [Character]!
  }
`;

export default typeDefs;
