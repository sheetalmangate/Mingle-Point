import { GraphQLError } from "graphql";
import { User } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import type IUserContext from "../interfaces/UserContext";
import { Types } from "mongoose";

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
        const user = await User.findById(context.user._id).populate([
          "pendingRequests",
          "followers",
          "following",
        ]);
        return user;
      }
      throw forbiddenException;
    },
    user: async (_parent: any, { _id }: { _id: string }) => {
      const user = await User.findById(new Types.ObjectId(_id));
      if (!user)
        throw new GraphQLError("User not found.", {
          extensions: { code: "NOT_FOUND" },
        });
      return user;
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
    logout: async (_: any, __: any, context: any): Promise<boolean> => {
      // Invalidate the token (implementation depends on your token management strategy)
      // For example, you could add the token to a blacklist
      if (context.user) {
        // Perform logout logic here
        return true;
      }
      return false;
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
          (id) => context.user && context.user._id && id.toString() === context.user._id.toString()
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
  },
};

export default resolvers;
