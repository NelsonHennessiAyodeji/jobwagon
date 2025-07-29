import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = "pending",
  Interview = "interview",
  Declined = "declined",
}

export enum JobMode {
  FullTime = "full-time",
  PartTime = "part-time",
  Internship = "internship",
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(3, {
    message: "position must be at least 3 characters.",
  }),
  company: z.string().min(3, {
    message: "company must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "location must be at least 3 characters.",
  }),
  status: z.enum(JobStatus),
  mode: z.enum(JobMode),
});

// Setting the type with the export so as not to stress me in the future
export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
