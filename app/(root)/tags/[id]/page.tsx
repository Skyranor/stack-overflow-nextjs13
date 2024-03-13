import { QuestionCard } from "@/components/cards/QuestionCard";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: 1,
  });

  console.log(result, "@result");
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          imgURL="/assets/icons/search.svg"
          placeholder="Search tag questions"
          route="/"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          // @ts-ignore
          result.questions.map((item) => (
            <QuestionCard
              key={item.id}
              createdAt={item.createdAt}
              title={item.title}
              id={item.id}
              author={item.author}
              upVotes={item.upVotes.length}
              views={item.views}
              answers={item.answers}
              tags={item.tags}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            linkTitle="Ask a Question"
            link="/"
          />
        )}
      </div>
    </>
  );
};

export default Page;
