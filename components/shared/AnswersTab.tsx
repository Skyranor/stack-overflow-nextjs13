import React from "react";
import { SearchParamsProps } from "@/types";
import { getUserAnswers, getUserQuestions } from "@/lib/actions/user.action";
import { AnswerCard } from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
export const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  console.log(result, "@result");
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upVotes={item.upVotes.length}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
};
