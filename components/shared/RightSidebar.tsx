import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RenderTag } from "./RenderTag";

const hotQuestions = [
  {
    _id: "1",
    title: "What is the best way to get started with Next.js?",
  },
  {
    _id: "2",
    title: "How do I use Next.js?",
  },
  {
    _id: "3",
    title: "How do I deploy Next.js?",
  },
];

const popularTags = [
  {
    _id: 1,
    name: "Next.js",
    totalQuestions: 5,
  },
  {
    _id: 2,
    name: "React.js",
    totalQuestions: 9,
  },
  {
    _id: 3,
    name: "Node.js",
    totalQuestions: 2,
  },
  {
    _id: 4,
    name: "Tailwind CSS",
    totalQuestions: 1,
  },
  {
    _id: 5,
    name: "Typescript",
    totalQuestions: 1,
  },
];

export const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 min-h-dvh  w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      {/* <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = item.route === pathname;

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src={"/assets/icons/account.svg"}
                width={20}
                height={20}
                alt={"Sign In"}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Sign In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src={"/assets/icons/sign-up.svg"}
                width={20}
                height={20}
                alt={"Sign Up"}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut> */}
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((item) => {
            return (
              <Link
                key={item._id}
                href={`/questions/${item._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {item.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={20}
                  height={20}
                  alt="arrow-right"
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((item) => (
            <RenderTag
              key={item._id}
              id={item._id}
              name={item.name}
              totalQuestions={item.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};
