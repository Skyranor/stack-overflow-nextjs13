import { UserCard } from "@/components/cards/UserCard";
import { Filter } from "@/components/shared/Filter";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const Page = async () => {
  const result = await getAllUsers({});
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgURL="/assets/icons/search.svg"
          placeholder="Search for questions"
          route="/"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((item) => <UserCard user={item} key={item.id} />)
        ) : (
          <div className="text-dark200_light800 paragraph-regular mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href={"/sign-up"} className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
