import { GraphQLError } from "graphql";
import { User, Schedule } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import type IUserContext from "../interfaces/UserContext";
import { Types } from "mongoose";
import IUserDocument from "../interfaces/UserDocument.js";
import { saveMessage, getMessages } from "../utils/chatbox.js";
import type Context from "../interfaces/context.js"
const MESSAGE_ADDED = 'MESSAGE_ADDED';
const forbiddenException = new GraphQLError(
  "You are not authorized to perform this action.",
  {
    extensions: {
      code: "FORBIDDEN",
    },
  }
);

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate(["pendingRequests", "followers", "following"])
          .populate({ path: "meetingSchedules", populate: { path: "dateId" } });
        return user;
      }
      throw forbiddenException;
    },
    user: async (
      _parent: any,
      { _id }: { _id: string },
      context: IUserContext
    ): Promise<IUserDocument | null> => {
      if (context.user) {
        const params = _id
          ? { _id: new Types.ObjectId(_id) }
          : { _id: context.user._id };
        const user = await User.findById(params);
        if (!user)
          throw new GraphQLError("User not found.", {
            extensions: { code: "NOT_FOUND" },
          });
        return user
          .populate(["meetingSchedules", "pendingRequests", "followers", "following"])

      }
      throw forbiddenException;
    },
    messages: async (_: any, { sender, receiver }: { sender: string; receiver: string }) => {

      // Return messages from your data source
      const messages = await getMessages(sender, receiver);
      return messages;
    },
    users: async () => {
      // Return all users from your data source
      const users = await User.find({});
      return users;
    },
  },

  Mutation: {
    addUser: async (_parent: any, args: any) => {
      const user = await User.create(args);
      const token = signToken(
        user.username,
        user.email,
        user._id as Types.ObjectId
      );
      return { token, user };
    },
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      console.log(email);
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new GraphQLError("Incorrect credentials. Please try again.", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const token = signToken(
        user.username,
        user.email,
        user._id as Types.ObjectId
      );
      return { token, user };
    },
    addMeetingSchedule: async (
      _parent: any,
      args: any,
      context: IUserContext
    ) => {
      if (context.user) {
        const schedule = await Schedule.create(args);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { meetingSchedules: schedule._id } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: args.dateId },
          { $push: { meetingSchedules: schedule._id } },
          { new: true }
        );
        return schedule.populate("dateId");
      }
      throw forbiddenException;
    },

    sendFollowRequest: async (
      _parent: any,
      { toUserId }: { toUserId: string },
      context: IUserContext
    ) => {
      if (!context.user) throw forbiddenException;

      const toUser = await User.findById(new Types.ObjectId(toUserId));
      if (!toUser)
        throw new GraphQLError("User not found.", {
          extensions: { code: "NOT_FOUND" },
        });

      if (
        toUser.pendingRequests.some(
          (id) =>
            context.user &&
            context.user._id &&
            id.toString() === context.user._id.toString()
        )
      ) {
        throw new GraphQLError("Follow request already sent.", {
          extensions: { code: "BAD_REQUEST" },
        });
      }

      toUser.pendingRequests.push(context.user._id as Types.ObjectId);
      await toUser.save();

      return toUser;
    },
    respondFollowRequest: async (
      _parent: any,
      { fromUserId, accept }: { fromUserId: string; accept: boolean },
      context: IUserContext
    ) => {
      if (!context.user) throw forbiddenException;

      const user = await User.findById(context.user._id);
      if (!user)
        throw new GraphQLError("User not found.", {
          extensions: { code: "NOT_FOUND" },
        });

      user.pendingRequests = user.pendingRequests.filter(
        (requestId) => requestId.toString() !== fromUserId
      );

      if (accept) {
        user.followers.push(new Types.ObjectId(fromUserId));
        const fromUser = await User.findById(new Types.ObjectId(fromUserId));
        if (fromUser) {
          fromUser.following.push(user._id as Types.ObjectId);
          await fromUser.save();
        }
      }

      await user.save();
      return user;
    },
    addProfile: async (_parent: any, args: any, context: IUserContext) => {
      if (context.user) {

        const user = await User.findByIdAndUpdate(context.user._id, { ...args }, { new: true, runValidators: true });

        return user;

      }
      throw forbiddenException
    },
    sendMessage: async (_: any, { content, username }: { content: string; username: string }, context: Context) => {
      if (!context.user || !context.user.username) {
        throw forbiddenException;
      }
      const sender = context.user.username;
      const message = await saveMessage(sender, username, content);
      try {
        await context.pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
        console.log('Message published successfully');
        return message;
      } catch (error) {
        console.error("Failed to publish message:", error);
        return null;
      }
    },
    updateProfile: async (_parent: any, args: any, context: IUserContext) => {
      if (!context.user) {
          throw forbiddenException;
      }
  
      try {
          console.log('Update Profile Args:', args.profileData); // Log received data
  
          const updatedUser = await User.findByIdAndUpdate(
              context.user._id,
              {
                  $set: {
                      name: args.profileData.name,
                      age: args.profileData.age,
                      hobbies: args.profileData.hobbies || [],
                      profilePicture: args.profileData.profilePicture,
                  },
              },
              { new: true, runValidators: true }
          );
  
          if (!updatedUser) {
              throw new GraphQLError("User not found", {
                  extensions: { code: "NOT_FOUND" },
              });
          }
  
          return updatedUser;
      } catch (error) {
          console.error("Update profile error:", error);
          throw new GraphQLError("Failed to update profile", {
              extensions: {
                  code: "BAD_USER_INPUT",
                  error: error instanceof Error ? error.message : 'Unknown error occurred',
              },
          });
      }
  },
  },
  Subscription: {
    messageAdded: {
      subscribe: (_: any, __: any, context: Context) => {
        return context.pubsub.asyncIterator(MESSAGE_ADDED);
      },
      resolve: (payload: { messageAdded: any },_: any, context: Context) => {
        // Filter messages to only send to the intended receiver
        if (context.user && (payload.messageAdded.receiver === context.user.username || payload.messageAdded.sender === context.user.username)) {
          return payload.messageAdded;
        }
        return null;
      },
    },
  },
};

export default resolvers;
