"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  id: string;
  type: "question" | "answer";
}

export const EditDeleteAction = ({ id, type }: Props) => {
  const pathname = usePathname();

  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(id)}`);
  };

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: id,
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: id,
        path: pathname,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src={"/assets/icons/edit.svg"}
          alt="edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src={"/assets/icons/trash.svg"}
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};
