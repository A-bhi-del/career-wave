import { prisma } from "@/app/utils/db";
import { EmptyState } from "./EmptyState";
import { Jobcard } from "./Jobcard";
import { MainPagination } from "./MainPagination";
import { JobpostStatus, Prisma } from "@prisma/client";

async function getData({
  page = 1,
  pageSize = 3,
  jobTypes = [],
  location = "",
  search = "",
  salaryRange = [0, 200000],
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
  search: string;
  salaryRange: number[];
}) {
  const skip = (page - 1) * pageSize;

  const where: Prisma.JobPostWhereInput = {
    status: JobpostStatus.ACTIVE,
    ...(jobTypes.length > 0 && {
      employmentType: {
        in: jobTypes,
      },
    }),
    ...(location && location !== "worldwide" && {
      location: location,
    }),
    ...(search && {
      jobTitle: {
        contains: search,
        mode: Prisma.QueryMode.insensitive
      }
    }),
    AND: [
      {
        salaryFrom: {
          gte: salaryRange[0]
        }
      },
      {
        salaryTo: {
          lte: salaryRange[1]
        }
      }
    ]
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: {
            name: true,
            Logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.jobPost.count({
      where: where,
    }),
  ]);
  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export async function JobListing({ 
  currentPage, 
  jobTypes, 
  location, 
  search,
  salaryRange = [0, 200000]
}: { 
  currentPage: number, 
  jobTypes: string[], 
  location: string, 
  search: string,
  salaryRange: number[]
}) {
  const { jobs, totalPages } = await getData({
    page: currentPage,
    pageSize: 3,
    jobTypes: jobTypes,
    location: location,
    search: search,
    salaryRange: salaryRange
  });
  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <Jobcard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          buttonText="Clear All Filters"
          description="No job posts found according to your selected filters"
          href="/"
          title="No jobs found"
        />
      )}
      <div className="flex justify-center mt-6">
        <MainPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
