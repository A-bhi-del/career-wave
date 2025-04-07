import { prisma } from "@/app/utils/db"
import { EmptyState } from "./EmptyState";
import { Jobcard } from "./Jobcard";

async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await prisma.jobPost.findMany({
        where:{
            status: "ACTIVE",
        },
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
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    return data;
}

export async function JobListing(){
    const data = await getData();
    return (
        <>
        {data.length > 0 ? (
            <div className="flex flex-col gap-6">
            {data.map((job) => (
                <Jobcard key={job.id} job={job}/>
            ))}

        </div>
        ) : (
            <EmptyState buttonText="Clear All Filters" description="No job posts found according to your selected filters" href="/" title="No jobs found"/>
        )}
        </>
    )
}