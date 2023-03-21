import { useState } from 'react';
import queryString from 'query-string';

const buildQueryString = <T,>(search: string, filters: T): string => {
  const searchParams = new URLSearchParams(search);
  Object.entries(filters as any).forEach(([name, value]) => {
    if (value) {
      searchParams.set(name, String(value));
    } else {
      searchParams.delete(name);
    }
  });

  const paramsString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  return paramsString;
};

export const useFilters = <T,>(search: string, inputFilters: T) => {
  const [filters, setFilters] = useState<T>(() => {
    return {
      ...inputFilters,
      ...queryString.parse(search)
    };
  });

  const updateFilters = async (newFilters: T) => {
    setFilters(newFilters);
    const paramsString = buildQueryString<T>(search, newFilters);
    return await new Promise<string>((resolve) => {
      resolve(paramsString);
    });
  };

  return { filters, updateFilters };
};
