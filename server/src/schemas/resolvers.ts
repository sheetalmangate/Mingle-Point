import { GraphQLError } from "graphql";
import { User } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import type IUserContext from "../interfaces/UserContext";
import type IUserDocument from "../interfaces/UserDocument";
import { Types } from "mongoose";


const forbiddenException = new GraphQLError(
  "You are not authorized to perform this action.",
  {
    extensions: {
      code: "FORBIDDEN",
    },
  },
);

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw forbiddenException;
    },
    
  },

  Mutation: {
    addUser: async (
      _parent: any,
      args: any,
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id as Types.ObjectId);

      return { token, user: user as IUserDocument };
    },
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string },
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new GraphQLError("Incorrect credentials. Please try again.", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }

      const token = signToken(user.username, user.email, user._id as Types.ObjectId);
      return { token, user: user as IUserDocument };
    },
  }
};

export default resolvers;
