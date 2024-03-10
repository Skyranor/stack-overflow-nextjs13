import { QuestionCard } from "@/components/cards/QuestionCard";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const Collection = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const { questions } = await getSavedQuestions({
    clerkId: userId,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgURL="/assets/icons/search.svg"
          placeholder="Search for questions"
          route="/"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          // @ts-ignore
          questions.map((item) => (
            <QuestionCard
              key={item.id}
              createdAt={item.createdAt}
              title={item.title}
              id={item.id}
              author={item.author}
              upVotes={item.upVotes.length}
              views={item.views}
              answers={item.answers}
              tags={
                item.tags as {
                  id: number;
                  name: string;
                  picture: string;
                }[]
              }
            />
          ))
        ) : (
          <NoResult
            title="There's no question saved to show"
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

export default Collection;
