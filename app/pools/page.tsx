import { Suspense } from "react";
import { Metadata } from "next";
import PoolsBrowser from "./PoolsBrowser";
import { Skeleton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pools abiertos",
  description: "Comparte el coste de un jet privado con quien va a tu mismo destino.",
};

export default function PoolsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="mt-8 h-96 w-full" />
        </div>
      }
    >
      <PoolsBrowser />
    </Suspense>
  );
}
