"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
    if (searchTerm.trim()) {
      handleSearchQuery("searchTerm", searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4">
      <div className="relative">
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg hover:shadow-lg transition-shadow duration-200 mb-10">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search dietary preferences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
            disabled={!searchTerm.trim()}
          >
            Search
          </Button>
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2 ml-2 text-center mb-5">
            Searching for: {searchTerm}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
