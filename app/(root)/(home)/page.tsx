import { QuestionCard } from "@/components/cards/QuestionCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    id: 1,
    title: "What is the best way to learn React?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: [
      { id: 1, name: "React.js" },
      { id: 1, name: "Next.js" },
    ],
    author: {
      name: "John Doe",
      imgUrl: "https://i.pravatar.cc/300",
      _id: 1,
    },
    upVotes: 10,
    views: 10150,
    answers: [],
    createdAt: new Date("2022-01-01T00:00:00.000Z"),
  },
  {
    id: 2,
    title: "How to center a div?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: [
      { id: 2, name: "CSS" },
      { id: 2, name: "Next.js" },
    ],
    author: {
      name: "Jane Doe",
      imgUrl: "https://i.pravatar.cc/300",
      _id: 2,
    },
    upVotes: 10,
    views: 10640200,
    answers: [],
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
  },
];

const Home = () => (
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
            upVotes={item.upVotes}
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

export default Home;
