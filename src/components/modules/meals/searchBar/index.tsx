"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSearch = () => {
    // console.log(searchTerm);
    handleSearchQuery("searchTerm", searchTerm);
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-2">
        <Input type="text" placeholder="Ex: Vegan, Gluten free" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default SearchBar;
