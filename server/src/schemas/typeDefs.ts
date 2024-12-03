import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    meetingSchedules: [Schedule]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(_id:ID):  User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMeetingSchedule(description: String, startDate: String!, endDate: String!, location: String, dateId:ID!, text: String!): Schedule, 
    
    sendFollowRequest(toUserId:ID!) : User
    respondFollowRequest(fromUserId: String, accept: Boolean): User
  }
`;

export default typeDefs;
