import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const addQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const removeQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  return { addQuery, removeQuery };
};

