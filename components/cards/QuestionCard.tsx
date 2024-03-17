import Link from "next/link";
import React from "react";
import { RenderTag } from "../shared/RenderTag";
import { Metric } from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";
import { EditDeleteAction } from "../shared/EditDeleteAction";

interface Props {
  title: string;
  author: {
    name: string;
    picture: string;
    _id: string | number;
  };
  upVotes: number;
  views: number;
  id: number;
  answers: Array<object>;
  createdAt: Date;
  tags: {
    _id: number;
    name: string;
    picture: string;
  }[];
  clerkId?: string | null;
}

export const QuestionCard = ({
  answers,
  author,
  createdAt,
  title,
  upVotes,
  views,
  tags,
  id,
  clerkId,
}: Props) => {
  const showActionButtons = clerkId === author._id;
  console.log(showActionButtons, "@showActionButtons", clerkId, author._id);

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* If signed in add edit delete actions */}
        {!showActionButtons && (
          <EditDeleteAction type="question" id={JSON.stringify(id)} />
        )}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((item) => (
          <RenderTag key={item._id} id={item._id} name={item.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="User"
          value={author.name || "Anonymous"}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Up Votes"
            value={formatAndDivideNumber(upVotes)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};
