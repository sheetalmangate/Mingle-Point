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
    startDate: String!
    endDate: String!
    location: String
    dateId: User!
    text: String!
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
    addMeetingSchedule(description: String, startDate: String!, endDate: String!, location: String, dateId:ID!, text: String!): Schedule, 
    
  }
`;

export default typeDefs;
