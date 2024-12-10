import { gql } from "@apollo/client";
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      meetingSchedules {
        _id
        description
        startDate
        endDate
        location
        dateId {
          _id
          username
          email
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($id: ID) {
    user(_id: $id) {
      _id
      email
      username
      name
      age
      hobbies
      profilePicture
      pendingRequests {
        _id
        username
        email
        name
        age
        hobbies
        profilePicture
      }
      followers {
        _id
        username
        email
        name
        age
        hobbies
        profilePicture
      }
      following {
        _id
        username
        email
        name
        age
        hobbies
        profilePicture
      }
      meetingSchedules {
        _id
        description
        startDate
        endDate
        location
        dateId {
          _id
        }
        text
      }
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($sender: String!, $receiver: String!) {
    messages(sender: $sender, receiver: $receiver) {
      id
      sender
      receiver
      content
      timestamp
    }
  }
`;
