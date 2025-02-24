import {z} from "zod";
export const companySchema = z.object({
    name: z.string().min(2, "Company name must be contain at least 2 characters"),
    location: z.string().min(1, "Company location must be contain at least 1 character"),
    about: z.string().min(10, "please provide some information about your comapny"),
    Logo: z.string().min(1, "please upload a logo"),
    website: z.string().url("please enter a valid url"),
    xAccount: z.string().optional(),
})