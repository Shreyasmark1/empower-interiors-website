import { useEffect, useMemo, useRef, useState, useId } from "react";

import Image from "next/image";

import { ArrowUpRight, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/search-input";

type Category = {
  name: string;
  count: number;
  image?: string;
};

type SearchWithDropdownProps = {
  className?: string;
  placeholder?: string;
  recentSearches?: string[];
  popularSearches?: string[];
  suggestions?: string[];
  categories?: Category[];
  onSelect?: (value: string) => void;
  onSearch?: (value: string) => void;
};

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1 || query.length === 0) {
    return <>{text}</>;
  }
  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);
  return (
    <>
      {before}
      <strong className="font-semibold text-foreground">{match}</strong>
      {after}
    </>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-4 pb-2 text-sm font-bold text-brand-magenta">
      {children}
    </p>
  );
}

export function SearchWithDropdown({
  className,
  placeholder = "Search products, categories, and more",
  recentSearches = [],
  popularSearches = [],
  suggestions = [],
  categories = [],
  onSelect,
  onSearch,
}: SearchWithDropdownProps) {
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return [];
    }
    return suggestions.filter((item) => item.toLowerCase().includes(trimmed));
  }, [query, suggestions]);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  function chooseValue(value: string) {
    setQuery(value);
    setIsOpen(false);
    onSelect?.(value);
  }

  function submit() {
    setIsOpen(false);
    onSearch?.(query);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (filteredSuggestions.length > 0) {
        chooseValue(filteredSuggestions[0]);
      } else {
        submit();
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full min-w-0", className)}
    >
      <SearchInput
        id={inputId}
        value={query}
        className="flex-1 "
        placeholder={placeholder}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen ? (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-md border border-border bg-popover shadow-md">
          {!hasQuery ? (
            <>
              {recentSearches.length > 0 && (
                <div>
                  <SectionHeader>Recent Searches</SectionHeader>
                  <ul>
                    {recentSearches.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                          onClick={() => chooseValue(item)}
                        >
                          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="truncate">{item}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {popularSearches.length > 0 && (
                <div>
                  <SectionHeader>Popular Searches</SectionHeader>
                  <div className="flex flex-wrap gap-2 px-4 pb-4">
                    {popularSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-sm text-foreground hover:border-muted-foreground hover:bg-muted"
                        onClick={() => chooseValue(item)}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {filteredSuggestions.length > 0 && (
                <ul>
                  {filteredSuggestions.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                        onClick={() => chooseValue(item)}
                      >
                        <span className="truncate">
                          <HighlightMatch text={item} query={query.trim()} />
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {categories.length > 0 && (
                <div>
                  <SectionHeader>Dive into Categories</SectionHeader>
                  <ul>
                    {categories.map((category) => (
                      <li key={category.name}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                          onClick={() => chooseValue(category.name)}
                        >
                          {category.image ? (
                            <Image
                              src={category.image}
                              alt=""
                              width={32}
                              height={32}
                              className="h-8 w-8 shrink-0 rounded-md object-cover"
                            />
                          ) : (
                            <span className="h-8 w-8 shrink-0 rounded-md bg-muted" />
                          )}
                          <span className="flex-1 truncate">
                            {category.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {category.count} options
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {filteredSuggestions.length === 0 && categories.length === 0 && (
                <p className="px-4 py-4 text-sm text-muted-foreground">
                  No matches found.
                </p>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
