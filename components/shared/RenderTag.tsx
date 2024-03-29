import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  id: number | string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

export const RenderTag = ({ id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <span className="small-medium text-dark500_light700">
          {totalQuestions}
        </span>
      )}
    </Link>
  );
};
