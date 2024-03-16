import React from "react";
import { SearchParamsProps } from "@/types";
import { getUserQuestions } from "@/lib/actions/user.action";
import { QuestionCard } from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
export const QuestionsTab = async ({
  searchParams,
  userId,
  clerkId,
}: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      {result.questions.map((item) => (
        <QuestionCard
          key={item.id}
          answers={item.answers}
          author={item.author}
          createdAt={item.createdAt}
          title={item.title}
          upVotes={item.upVotes.length}
          views={item.views}
          tags={item.tags}
          id={item.id}
          clerkId={clerkId}
        />
      ))}
    </>
  );
};
