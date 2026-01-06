import { prisma } from "@/app/utils/db";
import { JobpostStatus } from "@prisma/client";

import { EmptyState } from "./EmptyState";
import { Jobcard } from "./Jobcard";
import { MainPagination } from "./MainPagination";
import { SearchResultsSummary } from "./SearchResultsSummary";

interface GetDataArgs {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
  search: string;
  company: string;
  salaryMin: number;
  salaryMax: number;
  datePosted: string;
  sortBy: string;
  sortOrder: string;
}

async function getData({
  page,
  pageSize,
  jobTypes,
  location,
  search,
  company,
  salaryMin,
  salaryMax,
  datePosted,
  sortBy,
  sortOrder,
}: GetDataArgs) {
  const skip = (page - 1) * pageSize;

  /* ---------------- Date Filter ---------------- */
  let dateFilter: any = {};
  if (datePosted) {
    const daysAgo = parseInt(datePosted);
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - daysAgo);
    dateFilter = {
      createdAt: {
        gte: dateThreshold,
      },
    };
  }

  /* ---------------- Search Filters ---------------- */
  const searchFilters: any[] = [];
  if (search) {
    searchFilters.push(
      {
        jobTitle: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        jobDescription: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        benefits: {
          hasSome: [search],
        },
      }
    );
  }

  /* ---------------- Company Filter ---------------- */
  const companyFilter = company
    ? {
        Company: {
          name: {
            contains: company,
            mode: "insensitive",
          },
        },
      }
    : {};

  /* ---------------- WHERE Clause ---------------- */
  const where: any = {
    status: JobpostStatus.ACTIVE,

    ...(jobTypes.length > 0 && {
      employmentType: { in: jobTypes },
    }),

    ...(location && location !== "worldwide" && {
      location,
    }),

    ...(salaryMin > 0 || salaryMax < 200000
      ? {
          AND: [
            ...(salaryMin > 0 ? [{ salaryFrom: { gte: salaryMin } }] : []),
            ...(salaryMax < 200000 ? [{ salaryTo: { lte: salaryMax } }] : []),
          ],
        }
      : {}),

    ...dateFilter,
    ...companyFilter,

    ...(searchFilters.length > 0 && {
      OR: searchFilters,
    }),
  };

  /* ---------------- ORDER BY ---------------- */
  let orderBy: any = { createdAt: "desc" };

  if (sortBy === "salaryFrom" || sortBy === "salaryTo") {
    orderBy = { [sortBy]: sortOrder };
  } else if (sortBy === "jobTitle") {
    orderBy = { jobTitle: sortOrder };
  } else if (sortBy === "Company.name") {
    orderBy = { Company: { name: sortOrder } };
  }

  const [jobs, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where,
      take: pageSize,
      skip,
      orderBy,
      select: {
        id: true,
        jobTitle: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        benefits: true,
        Company: {
          select: {
            name: true,
            Logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),
    prisma.jobPost.count({ where }),
  ]);

  return {
    jobs,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

/* ================= JOB LISTING COMPONENT ================= */

interface JobListingProps {
  currentPage: number;
  jobTypes: string[];
  location: string;
  search: string;
  company: string;
  salaryMin: number;
  salaryMax: number;
  datePosted: string;
  sortBy: string;
  sortOrder: string;
}

export async function JobListing({
  currentPage,
  jobTypes,
  location,
  search,
  company,
  salaryMin,
  salaryMax,
  datePosted,
  sortBy,
  sortOrder,
}: JobListingProps) {
  const { jobs, totalPages, totalCount } = await getData({
    page: currentPage,
    pageSize: 6,
    jobTypes,
    location,
    search,
    company,
    salaryMin,
    salaryMax,
    datePosted,
    sortBy,
    sortOrder,
  });

  return (
    <div className="space-y-6">
      <SearchResultsSummary
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <Jobcard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description={
            search ||
            company ||
            jobTypes.length > 0 ||
            location ||
            datePosted ||
            salaryMin > 0 ||
            salaryMax < 200000
              ? "No job posts found matching your criteria. Try adjusting filters."
              : "No job posts available at the moment."
          }
          buttonText="Clear All Filters"
          href="/jobs"
        />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <MainPagination
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
