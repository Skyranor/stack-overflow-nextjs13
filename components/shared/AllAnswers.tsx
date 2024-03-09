import React from "react";
import { Filter } from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import { Votes } from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

export const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  filter,
  page,
}: Props) => {
  const result = await getAnswers({
    questionId,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((item) => (
          <article key={item.id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${item.author.clerkId}`}
                  className="
									flex flex-1 items-start gap-1 sm:items-center
								"
                >
                  <Image
                    src={item.author.picture}
                    alt="profile"
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {item.author.name}
                    </p>
                    <p className="small-regular text-dark400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      answered {getTimestamp(item.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(item.id)}
                    userId={JSON.stringify(userId)}
                    upVotes={item.upVotes.length}
                    downVotes={item.downVotes.length}
                    hasUpVoted={item.upVotes.includes(userId)}
                    hasDownVoted={item.downVotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={item.content} />
          </article>
        ))}
      </div>
    </div>
  );
};
