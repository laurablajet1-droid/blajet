import { Suspense } from "react";
import { Metadata } from "next";
import LegsBrowser from "./LegsBrowser";
import { Skeleton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Empty legs disponibles",
  description: "Vuelos que ya están programados y se venden muy por debajo de su precio como charter.",
};

export default function EmptyLegsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="mt-8 h-96 w-full" />
        </div>
      }
    >
      <LegsBrowser />
    </Suspense>
  );
}
