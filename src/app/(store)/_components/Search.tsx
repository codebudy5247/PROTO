"use client";
import { useState, useRef } from "react";
import { X, SearchIcon } from "lucide-react";

export const Search = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClearInput = () => {
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  const showClearButton = !!value;
  return (
    <form
      className="relative flex h-10 content-between items-center"
      onSubmit={handleSubmit}
    >
      <input
        className="h-full w-full rounded-lg border border-solid border-transparent bg-neutral-100 p-2.5 pr-9 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-black"
        type="text"
        name="search"
        id="search"
        placeholder="Search product..."
        aria-label="Search"
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
      />
      {showClearButton ? (
        <button
          type="button"
          className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
          aria-label="Clear search input"
          onClick={handleClearInput}
        >
          <X size="1.25rem" />
        </button>
      ) : (
        <button
          type="submit"
          className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
          aria-label="Submit search"
        >
          <SearchIcon size="1.25rem" />
        </button>
      )}
    </form>
  );
};
