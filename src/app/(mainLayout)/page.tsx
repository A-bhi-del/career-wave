import { JobFilter } from "@/components/general/Jobfilter";
import { JobListing } from "@/components/general/JobListing";
import { JobListingLoading } from "@/components/general/JobListingsLoading";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />

      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />}>
          <JobListing />
        </Suspense>
      </div>
    </div>
  );
}
