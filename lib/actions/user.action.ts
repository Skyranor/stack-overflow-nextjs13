"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Tag from "@/database/tag.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({
      clerkId: userId,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, path, updateData } = params;
    await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      {
        new: true,
      },
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    const { clerkId } = params;
    connectToDatabase();

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, comments, etc.

    // get user question ids
    const userQuestionIds = await Question.find({
      author: user.id,
    }).distinct("id");

    // delete user questions
    await Question.deleteMany({
      author: user.id,
    });

    // TODO: delete user comments, answers, etc.

    const deletedUser = await User.findByIdAndDelete(user.id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({
      joinedAt: -1,
    });
    return {
      users,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            saved: questionId,
          },
        },
        { new: true },
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            saved: questionId,
          },
        },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { clerkId, page = 1, pageSize = 20, filter, searchQuery } = params;

    const filterQuery: FilterQuery<typeof Question> = searchQuery
      ? { title: new RegExp(searchQuery, "i") }
      : {};

    const user = await User.findOne({
      clerkId,
    }).populate({
      path: "saved",
      match: filterQuery,
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "id name",
        },
        {
          path: "author",
          model: User,
          select: "id clerkId name picture",
        },
      ],
    });

    const savedQuestions = user.saved;

    return {
      questions: savedQuestions,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
