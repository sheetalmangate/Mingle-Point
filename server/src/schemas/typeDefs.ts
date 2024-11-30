import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    meetingSchedules: [Schedule]
  }

  type Schedule {
    _id: ID
    description: String
    startTime: String!
    endTime: String!
    location: String
    dateId: User!
  }
  

  type Auth {
    token: ID!
    user: User
  }

  

  type Query {
    me: User
    
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMeetingSchedule(description: String, startTime: String!, endTime: String!, location: String, dateId:ID!): Schedule, 
    
  }
`;

export default typeDefs;
