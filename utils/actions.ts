"use server";

import prisma from "./database";
import { auth } from "@clerk/nextjs";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

function authenticateAndRedirect(): string {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

type GetAllJobsActionTypes = {
  search?: string;
  jobsStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobsStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();
  try {
    let whereObj: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereObj = {
        ...whereObj,
        OR: [
          { position: { contains: search } },
          { company: { contains: search } },
        ],
      };
    }

    if (jobsStatus && jobsStatus !== "all") {
      whereObj = {
        ...whereObj,
        status: jobsStatus,
      };
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereObj,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}
