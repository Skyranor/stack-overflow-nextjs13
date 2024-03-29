import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ProfileLink } from "@/components/shared/ProfileLink";
import { Stats } from "@/components/shared/Stats";
import { QuestionsTab } from "@/components/shared/QuestionsTab";
import { AnswersTab } from "@/components/shared/AnswersTab";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({
    userId: params.id,
  });

  const { user } = userInfo;

  console.log(userInfo, "@userInfo");
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="text-dark200_light800 paragraph-regular">
              @{user.userName}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  title={"Portfolio"}
                  href={user.portfolioWebsite}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.joinedAt)}
              />
            </div>
            {user.bio && (
              <p className="text-dark400_light800 paragraph-regular mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {/* <SignIn > */}
          {/* <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900">
              Follow
            </Button> */}
          {clerkId === user.clerkId && (
            <Link href={`/profile/edit`}>
              <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                Edit Profile
              </Button>
            </Link>
          )}
          {/* </SignIn> */}
        </div>
      </div>
      <Stats
        totalAnswers={userInfo.totalAnswers}
        totalQuestions={userInfo.totalQuestions}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionsTab
              searchParams={searchParams}
              userId={user.id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              userId={user.id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
