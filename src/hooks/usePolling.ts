import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(ms: number = 60000, searchParam: string | null) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("interval running");
      if (!searchParam) {
        console.log("refreshing data");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);
  }, [ms, searchParam]); // eslint-disable-line react-hooks/exhaustive-deps //
}
