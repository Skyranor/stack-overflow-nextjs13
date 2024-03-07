import { Answer } from "@/components/forms/Answer";
import { Metric } from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import { RenderTag } from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params, searchParams }) => {
  console.log(searchParams);
  const result = await getQuestionById({ questionId: params.id });
  console.log(result);
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-row-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="profile"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end ">Voiting</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="Clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatAndDivideNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatAndDivideNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mb-10 mt-8 flex flex-wrap gap-2">
        {result.tags.map((item: any) => (
          <RenderTag id={item.id} name={item.name} key={item.id} />
        ))}
      </div>

      <Answer />
    </>
  );
};

export default Page;