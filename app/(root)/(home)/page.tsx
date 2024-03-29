import { QuestionCard } from "@/components/cards/QuestionCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

const Home = async () => {
  const { questions } = await getQuestions({});
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgURL="/assets/icons/search.svg"
          placeholder="Search for questions"
          route="/"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
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
            title="There's no question to show"
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

export default Home;
