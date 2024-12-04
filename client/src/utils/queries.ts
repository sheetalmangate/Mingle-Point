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
