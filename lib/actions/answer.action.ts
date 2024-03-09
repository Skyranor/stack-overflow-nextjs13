"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer.id },
    });

    // TODO: Add interaction ...

    revalidatePath(path);

    return newAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({
      question: questionId,
    })
      .populate("author", "id clerkId name picture")
      .sort({ createdAt: -1 });

    return {
      answers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasDownVoted, hasUpVoted, path } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
      };
    } else if (hasDownVoted) {
      updateQuery = {
        $push: { upVotes: userId },
        $pull: { downVotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upVotes: userId },
      };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasDownVoted, hasUpVoted, path } = params;
    console.log(params, "downvote params");
    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
      };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $push: { downVotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downVotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    console.log(answer, "answer--------------------------");

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
