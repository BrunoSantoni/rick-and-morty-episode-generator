import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query getCharacters($randomCharactersIds: [ID!]!) {
    charactersByIds(ids: $randomCharactersIds) {
      id
      name
      image
    }
  }
`;

export const GET_LOCATIONS = gql`
  query getLocations($randomLocationsIds: [ID!]!) {
    locationsByIds(ids: $randomLocationsIds) {
      id
      name
      type
      dimension
    }
  }
`;

export const GET_LOCATIONS_RANGE = gql`
  query getLocationsRange {
    locations {
      info {
        count
      }
    }
  }
`;

export const GET_CHARACTERS_RANGE = gql`
  query getCharactersRange {
    characters {
      info {
        count
      }
    }
  }
`;
