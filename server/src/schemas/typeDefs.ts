import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    name: String
    age: Int
    hobbies: [String]
    profilePicture: String
    pendingRequests: [User]
    followers: [User]
    following: [User]
    meetingSchedules: [Schedule]
  }
  type Message {
    id: ID!
    sender: String!
    receiver:String!
    content: String!    
    timestamp: String!
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
    user(_id: ID): User
    messages(sender:String!, receiver:String!):[Message]
    users:[User]
  }
  
  type Subscription {
    messageAdded: Message
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    sendMessage(content:String!,username:String!):Message
    addMeetingSchedule(
      description: String
      startDate: String!
      endDate: String!
      location: String
      dateId: ID!
      text: String!
    ): Schedule

    addProfile(name:String, age:Int,hobbies:[String],profilePicture:String): User
 
    sendFollowRequest(toUserId: ID!): User
    respondFollowRequest(fromUserId: String, accept: Boolean): User
  }
`;

export default typeDefs;
