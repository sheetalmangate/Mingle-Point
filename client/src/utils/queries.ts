import { gql } from '@apollo/client';
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
}`;

export const QUERY_USER = gql`
  query User {
  user {
    _id
    username
    email
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
        username
        email
        name
        age
        hobbies
        profilePicture
      }
      text
    }
  }
}
`;
