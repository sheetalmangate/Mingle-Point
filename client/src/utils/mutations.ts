import { gql } from '@apollo/client';
export const ADD_MEETING = gql`
mutation AddMeetingSchedule($startTime: String!, $endTime: String!, $dateId: ID!, $description: String, $location: String) {
  addMeetingSchedule(startTime: $startTime, endTime: $endTime, dateId: $dateId, description: $description, location: $location) {
    _id
    description
    startTime
    endTime
    location
    dateId {
      _id
      username
      email
    
      
    }
  }
}`;

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
