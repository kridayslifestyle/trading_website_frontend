"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "4rem",
      }}
    >
      <Loader2
        size={34}
        className="animate-spin"
      />
    </div>
  );
}