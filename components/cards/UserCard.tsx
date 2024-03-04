import { getTimestamp } from "@/lib/utils";
import { Schema } from "mongoose";
import Link from "next/link";
import React from "react";
import { RenderTag } from "../shared/RenderTag";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import { Badge } from "../ui/badge";

interface Props {
  user: {
    id: string;
    clerkId: string;
    name: string;
    userName: string;
    email: string;
    bio?: string;
    picture: string;
    location?: string;
    portfolioWebsite?: string;
    reputation?: number;
    saved: Array<Schema.Types.ObjectId>;
    joinedAt: Date;
    tags?: Array<string>;
  };
}

export const UserCard = async ({ user }: Props) => {
  const { id, clerkId, name, userName, email, picture, tags } = user;

  const interactedTags = await getTopInteractedTags({ userId: id });
  return (
    <Link
      href={`/profile/${id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={picture}
          alt={"user profile picture"}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">{name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">@{userName}</p>
          {/* <RenderTag tags={tags} /> */}
          <div className="mt-5">
            {interactedTags.length > 0 ? (
              <div className="flex items-center gap-2">
                {interactedTags.map((item) => (
                  <RenderTag name={item.name} key={item.id} id={item.id} />
                ))}
              </div>
            ) : (
              <Badge className="body-regular text-dark300_light900">
                No tags yet
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
