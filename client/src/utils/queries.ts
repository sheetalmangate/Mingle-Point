import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql `
    query Profile($id: ID!) {
        getProfile(_id: $id) {
        
        }
    }
`;

