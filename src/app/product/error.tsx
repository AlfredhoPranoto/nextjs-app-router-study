"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
