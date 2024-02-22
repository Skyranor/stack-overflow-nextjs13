import Image from "next/image";
import { Input } from "@/components/ui/input";

export const GlobalSearch = () => {
  return (
    <div className={"relative w-full max-w-[600px] max-lg:hidden"}>
      <div className="background-light800_darkgradient relative flex min-[56px] grow items-center gap-1 rounded-xl px-4 ">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          value={""}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};