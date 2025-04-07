import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingJobPage(){
    return (
        <div className="container mx-auto py-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-8 col-span-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <Skeleton className="h-9 w-[300px] mb-2" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-[75px]" />
                                <Skeleton className="h-5 w-[75px]" />
                                <Skeleton className="h-5 w-[75px]" />
                            </div>
                        </div>
                    </div>
                    <section className="space-y-4">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-5/6"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-5/6"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-5/6"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                    </section>
                    <section>
                        <Skeleton className="h-6 w-[120px] mb-4"/>
                        <div>
                            {}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}