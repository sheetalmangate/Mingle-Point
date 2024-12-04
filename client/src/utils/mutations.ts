import { gql } from '@apollo/client';
export const ADD_MEETING = gql`
mutation AddMeetingSchedule($startDate: String!, $endDate: String!, $dateId: ID!, $description: String, $location: String, $text: String!) {
  addMeetingSchedule(startDate: $startDate, endDate: $endDate, dateId: $dateId, description: $description, location: $location, text: $text) {
    _id
    description
    startDate
    endDate
    text
    location
    dateId {
      _id
      username
      email
    
      
    }
  }
}`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $username: String!) {
    sendMessage(content: $content, username: $username) {
      id
      sender
      receiver
      content
      timestamp
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_PROFILE = gql`
  mutation AddProfile($name: String, $age: Int, $hobbies: [String], $profilePicture: String) {
  addProfile(name: $name, age: $age, hobbies: $hobbies, profilePicture: $profilePicture) {
    _id
    name
    age
    hobbies
    profilePicture
  }
}
`;
