import { gql } from '@apollo/client';
export const MESSAGE_ADDED_SUBSCRIPTION = gql`
subscription OnMessageAdded {
  messageAdded {
    id
    sender
    receiver
    content
    timestamp
  }
}
`;
