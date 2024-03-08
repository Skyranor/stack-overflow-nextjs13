"use client";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upVotes: number;
  downVotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

export const Votes = (props: Props) => {
  const {
    type,
    itemId,
    userId,
    upVotes,
    downVotes,
    hasUpVoted,
    hasDownVoted,
    hasSaved,
  } = props;

  const handleSave = () => {};

  const handleVote = (action: string) => {};
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="up-vote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              // TODO: Implement up vote
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upVotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="down-vote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              // TODO:
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downVotes)}
            </p>
          </div>
        </div>
      </div>

      <Image
        src={
          hasSaved
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        alt="star"
        width={18}
        height={18}
        className="cursor-pointer"
        onClick={() => {
          // TODO: I
        }}
      />
    </div>
  );
};
