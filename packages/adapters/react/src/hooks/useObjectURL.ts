import { useState, useEffect } from "react";
import { Data } from "@monotonics/core";
import { useUseCases } from "@/store";

export const useObjectURL = (data?: Pick<Data, "id" | "mimeType">) => {
  const [url, setUrl] = useState<string | undefined>();
  const useCases = useUseCases();
  useEffect(() => {
    let mounted = true;
    if (data)
      useCases.getRawData.execute(data.id).then((buffer) => {
        const blob = new Blob([buffer], { type: data.mimeType });
        const url = URL.createObjectURL(blob);
        if (mounted) setUrl(url);
      });
    return () => {
      mounted = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [useCases, data]);
  return url;
};
