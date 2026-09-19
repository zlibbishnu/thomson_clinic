"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const search = query.trim();

    if (!search) return;

    router.push(`/doctors?search=${encodeURIComponent(search)}`);
  }

  return (
    <form className="global-search" onSubmit={handleSearch}>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search doctors, specialties or services"
        aria-label="Search doctors, specialties or services"
      />

      {query && (
        <button
          type="button"
          className="search-clear"
          onClick={() => setQuery("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}