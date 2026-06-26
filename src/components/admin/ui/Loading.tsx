"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      style={{
        padding: "4rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Loader2
        size={40}
        className="animate-spin"
      />
    </div>
  );
}